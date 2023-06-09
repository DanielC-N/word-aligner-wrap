import './App.css';
import {
  addAlignmentsToVerseUSFM,
  areAlgnmentsComplete,
  parseUsfmToWordAlignerData
} from "./utils/alignmentHelpers.js";
// import {convertVerseDataToUSFM } from "../utils/UsfmFileConversionHelpers";
import { WordAligner } from 'word-aligner-rcl';
// import { Proskomma } from 'proskomma-cross';
import { Aligner } from './utils/alignmentApi';
import ProskommaInterface from './classes/ProskommaInterface';

var alignedVerseJson = require('./__tests__/fixtures/alignments/en_ult_tit_1_1_unaligned.json');
var originalVerseJson = require('./__tests__/fixtures/alignments/grk_tit_1_1.json');
const LexiconData = require("./__tests__/fixtures/lexicon/lexicons.json");

const translate = (key) => {
  console.log(`translate(${key})`)
};

const targetVerseUSFM = alignedVerseJson.usfm;
const sourceVerseUSFM = originalVerseJson.usfm;

const pkInterface = new ProskommaInterface();
pkInterface.addRawDocument(sourceVerseUSFM, "grk", "tit");
pkInterface.addRawDocument(targetVerseUSFM, "eng", "ult");

// let ids = pkInterface.getIdsUsfms();
// console.log("IDS USFM :",ids);
// console.log(pkInterface.getIds());
// console.log("source text:", pkInterface.getSourceText());
// console.log("target text:", pkInterface.getTargetText());

const aligner = new Aligner({
  sourceUsfm:[sourceVerseUSFM,  "grk", "tit"],
  targetUsfm:[targetVerseUSFM, "eng", "ult"],
  verbose:false
});
aligner.setCurrentChapter(1);
aligner.setCurrentVerse(1);
aligner.setCurrentSourceSentence(pkInterface.getSourceText());
aligner.setCurrentTargetSentence(pkInterface.getTargetText());

const {wordListWords, verseAlignments} = parseUsfmToWordAlignerData(targetVerseUSFM, sourceVerseUSFM);

const alignmentComplete = areAlgnmentsComplete(wordListWords, verseAlignments);
console.log(`Alignments are ${alignmentComplete ? 'COMPLETE!' : 'incomplete'}`);


function App() {
  
  // const promise = pk.gqlQuerySync("{ id }");
  // console.log(promise.data.id);
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
    const {destSourceToken, destTargetToken, srcSourceToken, srcTargetToken} = results;
    console.log(results);
    handleAlign(destSourceToken, destTargetToken, srcSourceToken, srcTargetToken);

    // const {wordListWords, verseAlignments} = results;
    // const verseUsfm = addAlignmentsToVerseUSFM(wordListWords, verseAlignments, targetVerseUSFM);
    // const alignmentComplete = areAlgnmentsComplete(wordListWords, verseAlignments);
    // console.log(`Alignments are ${alignmentComplete ? 'COMPLETE!' : 'incomplete'}`);
    console.log(aligner.getAlignmentJSON());
  }

  function downloadAlignmentJson() {
    return aligner.getAlignmentJSON();
  }

  function handleAlign(destSourceToken, destTargetToken, srcSourceToken, srcTargetToken) {
    let indexDestSource = destSourceToken[0]["index"];
    let indexDestTarget = destTargetToken[0]["index"];
    if(!srcSourceToken && !srcTargetToken) { // the word comes from the list
      aligner.addAlignment(indexDestSource, indexDestTarget);
    } else { // the word comes from the grid
      let indexSrcSource = srcSourceToken[0]["index"];
      let indexSrcTarget = srcTargetToken[0]["index"];
      aligner.addAlignment(indexDestSource, indexDestTarget);
      aligner.removeAlignment(indexSrcSource, indexSrcTarget);
      // TODO
    }
  }

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header> */}
      <div style={{height: '650px', width: '800px'}}>
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
      <a
        class="button"
        href={`data:text/json;charset=utf-8,${encodeURIComponent(
          JSON.stringify(aligner.getAlignmentJSON(), null, 4)
        )}`}
        download="alignmentData.json"
      >
        {`Download Alignment Json`}
      </a>
    </div>
  );
}

export default App;
