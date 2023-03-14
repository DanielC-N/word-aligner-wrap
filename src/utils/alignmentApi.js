import { isNull } from 'lodash';
import { Proskomma } from 'proskomma-cross';
import Epitelete from 'epitelete';
import { PipelineHandler } from 'proskomma-json-tools';

export class Aligner {
    /**
     *
     * @param {Proskomma} proskomma - a proskomma instance
     * @param {boolean} verbose
     */
    constructor({proskomma = null, verbose=false}) {

        if (proskomma !== null) {
            this.proskomma = proskomma;
        } else {
            this.proskomma = new Proskomma();
        }
        const query = '{ id }';
        const content = proskomma.gqlQuerySync(query) || {};

        if (!isNull(this.proskomma) || !content || !content.data.id) {
            throw new Error("Error instanciating Proskomma, please contact Jesus, he's the only one capable of resolving this problem");
        }
    }


}

/**
 * Proskomma instance
 * @typedef Proskomma
 * @see {@link https://github.com/abelpz/proskomma-testing-environment/tree/main/libs/pk-core}
 */