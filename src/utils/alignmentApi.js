import { isNull } from 'lodash';
// import { Proskomma } from 'proskomma-cross';
import ProskommaInterface from '../classes/ProskommaInterface';
import Epitelete from 'epitelete';
import { PipelineHandler } from 'proskomma-json-tools';

export class Aligner {
    /**
     *
     * @param {String[]} sourceUsfms - source raw usfm, code lang and abbr
     * @param {String[]} targetUsfm - target raw usfm, code lang and abbr
     * @param {boolean} verbose
     */
    constructor({sourceUsfm=[], targetUsfm=[], verbose=false}) {

        this.proskommaInterface = new ProskommaInterface();
        this.proskommaInterface.addRawDocument(sourceUsfm[0], sourceUsfm[1], sourceUsfm[2]);
        this.proskommaInterface.addRawDocument(targetUsfm[0], targetUsfm[1], targetUsfm[2]);
        
        this.currentSentence = [];
        this.sourceUsfm = sourceUsfm[0];
        this.targetUsfm = targetUsfm[0];
        this.verbose = verbose;
    }

    /**
     * 
     * @returns {string[]}
     */
    getCurrentSentence() {
        return this.currentSentence;
    }

    /**
     * 
     * @param {string[]|string} sentence the sentence for alignment
     */
    setCurrentSentence(sentence) {
        if(typeof sentence === "object" && !isNull(sentence[0]) && typeof sentence[0] === "string") {
            this.currentSentence = sentence;
        } else if (typeof sentence === "string") {
            this.currentSentence = sentence.trim().split(/\W+/g);
        }
    }

    /**
     * Get a well formated JSON word alignment informations
     * @returns {JSON}
     */
    getAlignmentJSON() {
        // TODO
    }

    addAlignment() {
        // TODO
    }

    removeAlignment(indexA, IndexB) {
        // TODO
    }
}

/**
 * Proskomma instance
 * @typedef Proskomma
 * @see {@link https://github.com/abelpz/proskomma-testing-environment/tree/main/libs/pk-core}
 */