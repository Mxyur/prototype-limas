// LIMAS Product Final — presentation/workflow guards for Limit Action.
// No canonical calculation or master mutation is introduced here.

export const LIMIT_ACTION_TRANSITIONS = {
  CREATED: ["SUBMITTED"],
  SUBMITTED: ["REVIEWED", "REJECTED"],
  REVIEWED: ["APPROVED", "REJECTED"],
  APPROVED: ["EFFECTIVE"],
  EFFECTIVE: ["SYNCED"],
  SYNCED: [],
  REJECTED: ["CREATED"],
};

const nonBlank = value => String(value ?? "").trim().length > 0;
const numOrNull = value => value === "" || value == null ? null : Number(value);

const hasPositiveNumber = value => {
  const number = Number(value);
  return Number.isFinite(number) && number > 0;
};

export function validateLimitAction(draft) {
  if (!draft.selectedObject) return {ok:false, message:"Select a limit object before creating the action."};
  if (!nonBlank(draft.proposedAction)) return {ok:false, message:"Describe the proposed management action."};
  if (!draft.effectiveDate) return {ok:false, message:"Select an effective date."};
  if (!nonBlank(draft.reason)) return {ok:false, message:"Capture the business reason / management rationale."};
  if (!nonBlank(draft.committeeRef)) return {ok:false, message:"Capture the Management Committee reference for the proposed action."};

  if (draft.domain === "Country") {
    const domestic = numOrNull(draft.countryDomestic);
    const overseas = numOrNull(draft.countryOverseas);
    const proposedCapacity = draft.actionLevel === "COUNTRY_CAPACITY" ? numOrNull(draft.proposedLimit) : numOrNull(draft.currentLimit);
    if ((draft.actionLevel === "COUNTRY_CAPACITY" || draft.actionLevel === "PRODUCT") && numOrNull(draft.proposedLimit) == null) {
      return {ok:false, message:"Provide the proposed limit value for this Country action."};
    }
    if ((domestic != null || overseas != null) && (domestic ?? 0) + (overseas ?? 0) > (proposedCapacity ?? 0)) {
      return {ok:false, message:"Domestic + Overseas allocation cannot exceed the proposed Country Capacity."};
    }
    if (draft.actionLevel === "PRODUCT" && !nonBlank(draft.countryProduct)) {
      return {ok:false, message:"Product Allocation actions require a product bucket."};
    }
  }

  if (draft.domain === "CCL") {
    if (!nonBlank(draft.cclDirection)) return {ok:false, message:"Select Direct or Indirect scope for the CCL action."};
    if (!nonBlank(draft.cclEntityScope)) return {ok:false, message:"Capture the participating entity scope for the CCL action."};
    if (draft.cclLayer === "CCL" && numOrNull(draft.proposedCcl) == null) return {ok:false, message:"Provide the proposed CCL value for a CCL action."};
    if (draft.cclLayer === "CONTRACTUAL" && numOrNull(draft.proposedContractual) == null) return {ok:false, message:"Provide the proposed Contractual Limit value for a contractual action."};
  }

  if (draft.domain === "MLK" && draft.mlkMode === "LIMIT_CHANGE" && numOrNull(draft.proposedLimit) == null) {
    return {ok:false, message:"Provide the proposed Group Usaha limit value for an MLK limit change."};
  }

  if (draft.domain === "MLK" && draft.mlkMode === "GROUP_BREACH") {
    if (!hasPositiveNumber(draft.memberUplift)) return {ok:false, message:"Provide the proposed member uplift amount for a Group Breach action."};
    if (!draft.rowsInGroup?.length) return {ok:false, message:"Group Breach requires resolved Group member positions."};
  }

  if (draft.domain === "MLK" && draft.mlkMode === "SWITCHING") {
    if (!nonBlank(draft.donorKey) || !nonBlank(draft.recipientKey) || draft.donorKey === draft.recipientKey || !hasPositiveNumber(draft.switchingAmount)) {
      return {ok:false, message:"Select distinct donor and recipient members in the same Group Usaha and provide the switching amount."};
    }
    if (!draft.rowsInGroup?.some(row => String(row.key) === String(draft.donorKey)) || !draft.rowsInGroup?.some(row => String(row.key) === String(draft.recipientKey))) {
      return {ok:false, message:"MLK switching donor and recipient must remain within the selected Group Usaha."};
    }
  }

  if (draft.domain === "CIL") {
    const inputs = draft.cilInput || {};
    if (![inputs.ic, inputs.multiplier, inputs.eil].some(hasPositiveNumber)) {
      return {ok:false, message:"Provide at least one CIL structural input: IC, Multiplier, or EIL."};
    }
  }

  if (draft.domain === "LPG") {
    if (!nonBlank(draft.lpgScope) || !nonBlank(draft.lpgRegion) || !nonBlank(draft.lpgIcSegwil)) return {ok:false, message:"LPG actions require explicit scope, Region / scope value, and IC Wilayah Segmen context."};
    if (!nonBlank(draft.lpgSegment)) return {ok:false, message:"LPG actions require an explicit Segment."};
    if (!nonBlank(draft.lpgBucket)) return {ok:false, message:"LPG actions require a Limit Bucket."};
    if (numOrNull(draft.proposedLimit) == null) return {ok:false, message:"Provide the proposed LPG appetite limit value."};
  }

  const actionLevel = draft.domain === "Country"
    ? (draft.actionLevel || "COUNTRY_CAPACITY")
    : draft.domain === "CCL"
      ? draft.cclLayer
      : draft.domain === "MLK"
        ? draft.mlkMode
        : draft.domain === "CIL"
          ? "STRUCTURAL_INPUT"
          : "APPETITE_BUCKET";
  return {ok:true, actionLevel};
}

export function buildLimitActionAfter(draft) {
  const after = {
    limit: draft.proposedLimit === "" || draft.proposedLimit == null ? null : Number(draft.proposedLimit),
  };
  if (draft.domain === "Country") {
    after.countryCapacity = draft.actionLevel === "COUNTRY_CAPACITY" ? numOrNull(draft.proposedLimit) : Number(draft.currentLimit || 0);
    after.domestic = numOrNull(draft.countryDomestic);
    after.overseas = numOrNull(draft.countryOverseas);
    after.product = draft.countryProduct || null;
    after.scope = draft.countryScope || null;
    if (draft.actionLevel === "COUNTRY_CAPACITY") after.limit = after.countryCapacity;
  }
  if (draft.domain === "CCL") {
    after.ccl = draft.cclLayer === "CCL" ? numOrNull(draft.proposedCcl) : Number(draft.currentLimit || 0);
    after.contractual = draft.cclLayer === "CONTRACTUAL" ? numOrNull(draft.proposedContractual) : numOrNull(draft.selectedObject?.contractual);
    after.directIndirect = draft.cclDirection || null;
    after.entityScope = draft.cclEntityScope || null;
    after.limit = draft.cclLayer === "CONTRACTUAL" ? after.contractual : after.ccl;
  }
  if (draft.domain === "MLK" && draft.mlkMode === "LIMIT_CHANGE" && numOrNull(draft.proposedLimit) == null) {
    return {ok:false, message:"Provide the proposed Group Usaha limit value for an MLK limit change."};
  }

  if (draft.domain === "MLK" && draft.mlkMode === "GROUP_BREACH") {
    after.memberUplift = numOrNull(draft.memberUplift);
    after.targetMemberKey = draft.targetMemberKey || null;
    after.group = draft.selectedObject?.group || null;
    after.targetMemberKey = draft.targetMemberKey || null;
    after.memberUplift = numOrNull(draft.memberUplift);
    after.currentGroupPosition = "CANONICAL_READ_ONLY";
    after.projectedGroupPosition = "CANONICAL_RECALC_REQUIRED";
    after.projectionStatus = "PENDING_CANONICAL_RECALC";
  }
  if (draft.domain === "MLK" && draft.mlkMode === "SWITCHING") {
    after.switchingAmount = numOrNull(draft.switchingAmount);
    after.donorKey = draft.donorKey;
    after.recipientKey = draft.recipientKey;
    after.group = draft.selectedObject?.group || null;
  }
  if (draft.domain === "CIL") {
    after.inputs = {
      IC: numOrNull(draft.cilInput?.ic),
      Multiplier: numOrNull(draft.cilInput?.multiplier),
      EIL: numOrNull(draft.cilInput?.eil),
    };
    after.derived = {CIT:"READ ONLY", CIL:"READ ONLY"};
  }
  if (draft.domain === "LPG") {
    after.scope = draft.lpgScope;
    after.segment = draft.lpgSegment;
    after.region = draft.lpgRegion;
    after.icSegwil = draft.lpgIcSegwil;
    after.bucket = draft.lpgBucket;
    after.product = draft.lpgProduct || null;
  }
  return after;
}

export function limitActionChangeLabel(action) {
  const before = Number(action?.before?.limit);
  const after = Number(action?.after?.limit ?? action?.proposedLimit);
  if (!Number.isFinite(before) || !Number.isFinite(after)) {
    if (action?.after?.switchingAmount != null) return `Reallocation ${Number(action.after.switchingAmount).toLocaleString("id-ID")}`;
    if (action?.after?.memberUplift != null) return `Member uplift ${Number(action.after.memberUplift).toLocaleString("id-ID")}`;
    return "Structural / parameter change";
  }
  const delta = after - before;
  return `${delta >= 0 ? "+" : ""}${delta.toLocaleString("id-ID")}`;
}
