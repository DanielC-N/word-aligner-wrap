import './App.css';
import {
  addAlignmentsToVerseUSFM,
  areAlgnmentsComplete,
  parseUsfmToWordAlignerData
} from "./utils/alignmentHelpers.js";
// import {convertVerseDataToUSFM } from "../utils/UsfmFileConversionHelpers";
import { WordAligner } from 'word-aligner-rcl';
import { Proskomma } from 'proskomma-cross';

var alignedVerseJson = require('./__tests__/fixtures/alignments/en_ult_tit_1_1_partial.json');
var originalVerseJson = require('./__tests__/fixtures/alignments/grk_tit_1_1.json');
const LexiconData = require("./__tests__/fixtures/lexicon/lexicons.json");

const translate = (key) => {
  console.log(`translate(${key})`)
};

const targetVerseUSFM = alignedVerseJson.usfm;
const sourceVerseUSFM = originalVerseJson.usfm;

const {wordListWords, verseAlignments} = parseUsfmToWordAlignerData(targetVerseUSFM, sourceVerseUSFM);

const alignmentComplete = areAlgnmentsComplete(wordListWords, verseAlignments);
console.log(`Alignments are ${alignmentComplete ? 'COMPLETE!' : 'incomplete'}`);


function App() {
  const pk = new Proskomma();
  const promise = pk.gqlQuerySync("{ id }");
  console.log(promise.data.id);
  const targetLanguageFont = '';
  const sourceLanguage = 'el-x-koine';
  const lexicons = {};
  const contextId = {
    "reference": {
      "bookId": "tit",
      "chapter": 1,
      "verse": 1
    },
    "tool": "wordAlignment",
    "groupId": "chapter_1"
  };
  const showPopover = (key) => {
    console.log(`showPopover(${key})`)
  };
  const loadLexiconEntry = (key) => {
    console.log(`loadLexiconEntry(${key})`)
  };
  const getLexiconData_ = (lexiconId, entryId) => {
    console.log(`loadLexiconEntry(${lexiconId}, ${entryId})`)
    const entryData = (LexiconData && LexiconData[lexiconId]) ? LexiconData[lexiconId][entryId] : null;
    return {[lexiconId]: {[entryId]: entryData}};
  };

  function onChange(results) {
    // console.log(`WordAligner() - alignment changed, results`, results);// merge alignments into target verse and convert to USFM
    const {wordListWords, verseAlignments} = results;
    const verseUsfm = addAlignmentsToVerseUSFM(wordListWords, verseAlignments, targetVerseUSFM);
    console.log(verseAlignments);
    const alignmentComplete = areAlgnmentsComplete(wordListWords, verseAlignments);
    console.log(`Alignments are ${alignmentComplete ? 'COMPLETE!' : 'incomplete'}`);
  }

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header> */}
      <div className="App" style={{height: '650px', width: '800px'}}>
        <WordAligner
          verseAlignments={verseAlignments}
          wordListWords={wordListWords}
          translate={translate}
          contextId={contextId}
          targetLanguageFont={targetLanguageFont}
          sourceLanguage={sourceLanguage}
          showPopover={showPopover}
          lexicons={lexicons}
          loadLexiconEntry={loadLexiconEntry}
          onChange={onChange}
          getLexiconData={getLexiconData_}
        />
      </div>
    </div>
  );
}

export default App;
