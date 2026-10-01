import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import Limas from './components/Limas';
import type { ILimasWebPartProps } from './ILimasWebPartProps';

export default class LimasWebPart extends BaseClientSideWebPart<ILimasWebPartProps> {
  public render(): void {
    const element: React.ReactElement = React.createElement(Limas, {});
    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: { description: 'LIMAS configuration' },
          groups: [
            {
              groupName: 'Prototype',
              groupFields: [
                PropertyPaneTextField('title', {
                  label: 'Page title',
                  value: 'LIMAS'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
