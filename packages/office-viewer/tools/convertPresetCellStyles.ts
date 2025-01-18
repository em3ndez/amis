/**
 * 转换 presetCellStyles 为对象，但好像这个功能在浏览模式不需要
 */

import {readFileSync, writeFileSync} from 'fs';
import prettier from 'prettier';
import {xml2json} from '../src/util/xml';
import {autoParse} from '../src/common/autoParse';
import {
  CT_Stylesheet,
  CT_Stylesheet_Attributes
} from '../src/openxml/ExcelTypes';

async function convert() {
  const presetFileNode = await xml2json(
    readFileSync(
      './OfficeOpenXML-SpreadsheetMLStyles/presetCellStyles.xml',
      'utf-8'
    )
  );
  const presetCellStyles: Record<string, CT_Stylesheet> = {};
  for (const tableStyle of presetFileNode.children) {
    const styleId = tableStyle.attrs['builtinId'];
    const styleDef = autoParse(
      tableStyle.children[0],
      CT_Stylesheet_Attributes
    );

    if (styleDef) {
      delete styleDef['xmlns'];
      presetCellStyles[styleId] = styleDef;
    }
  }

  let outputFile: string[] = [
    '/** generated by tools/convertPresetCellStyles.ts, do not edit */',
    `import {CT_Stylesheet} from '../../../../openxml/ExcelTypes';`
  ];
  outputFile.push(
    'export const presetCellStyles: Record<string, CT_Stylesheet> = ' +
      JSON.stringify(presetCellStyles, null, 2) +
      ';'
  );

  prettier.resolveConfig('../../../.prettierrc').then(options => {
    const formatted = prettier.format(outputFile.join('\n'), {
      ...options,
      parser: 'typescript'
    });
    writeFileSync(
      '../src/excel/io/excel/preset/presetCellStyles.ts',
      formatted
    );
  });
}

convert();
