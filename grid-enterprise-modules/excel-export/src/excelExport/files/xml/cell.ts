import { ExcelXMLTemplate, ExcelCell, XmlElement } from '@ag-grid-community/core';

const cell: ExcelXMLTemplate = {
    getTemplate(c: ExcelCell): XmlElement {
        const { mergeAcross, styleId, data } = c;
        const properties : { [id:string]: string | number } = {};

        if (mergeAcross) {
            properties.MergeAcross = mergeAcross;
        }
        if (styleId) {
            properties.StyleID = styleId as string;
        }

        return {
            name: "Cell",
            properties: {
                prefixedAttributes: [{
                    prefix: "ss:",
                    map: properties
                }]
            },
            children: [{
                name: "Data",
                properties: {
                    prefixedAttributes: [{
                        prefix: "ss:",
                        map: {
                            Type: data?.type
                        }
                    }]
                },
                textNode: data?.value
            }]
        };
    }
};

export default cell;
