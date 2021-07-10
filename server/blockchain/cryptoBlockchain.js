const CryptoBlock = require("./block");
const blockContent = require("../model/blockSchema");
const updateBlock = require("../DB/update");

const id = "blockchain";

//async function updateBlock(block, indexBlockchain, indexInblockChain) {
//    //let id = "blockchain" + indexBlockchain + "" + indexInblockChain;
//    const filter = {
//        id: "blockchain" + indexBlockchain + "" + indexInblockChain,
//    };
//    const update = {...block };
//    const response = await blockContent.findOneAndUpdate(filter, update);
//    console.log(response);
//}

class CryptoBlockchain {
    constructor(indexBlockchain) {
        this.blockchain = [this.startGenesisBlock(indexBlockchain)];
    }

    startGenesisBlock(indexBlockchain) {
        const firstBlock = new CryptoBlock(1, "01/01/2020", "", "0");
        firstBlock.mineBlock(3);

        const content = new blockContent({
            ...firstBlock,
            id: id + indexBlockchain + "" + 1,
        });
        content.save().catch(() => {
            updateBlock(firstBlock, "blockchain" + indexBlockchain + "" + 1);
        });

        return firstBlock;
    }

    obtainLatestBlock() {
        return this.blockchain[this.blockchain.length - 1];
    }

    addNewBlock(newBlock, indexBlockchain, indexBlock) {
        newBlock.precedingHash = this.obtainLatestBlock().hash;
        newBlock.mineBlock(3);
        this.blockchain.push(newBlock);

        const content = new blockContent({
            ...newBlock,
            id: id + indexBlockchain + "" + indexBlock,
        });
        content.save().catch(() => {
            updateBlock(newBlock, "blockchain" + indexBlockchain + "" + indexBlock);
        });
    }

    changeBlockchain(newBlock, indexBlockchain) {
        this.blockchain[newBlock.numBlock].data = newBlock.data;
        this.blockchain[newBlock.numBlock].index = newBlock.index;
        this.blockchain[newBlock.numBlock].nonce = newBlock.nonce;
        let stopCheckIfMine = false;

        for (let i = newBlock.numBlock; i < this.blockchain.length; i++) {
            if (i === 0) {
                this.blockchain[i].precedingHash = 0;
                this.blockchain[i].hash = this.blockchain[i].computeHash();
            } else {
                this.blockchain[i].precedingHash = this.blockchain[i - 1].hash;
                this.blockchain[i].hash = this.blockchain[i].computeHash();
            }
            if (!stopCheckIfMine) {
                this.blockchain[i].checkIfBlockMine();
                if (!this.blockchain[i].isMine) stopCheckIfMine = true;
            } else {
                this.blockchain[i].isMine = false;
            }

            updateBlock(
                this.blockchain[i],
                "blockchain" + indexBlockchain + "" + (i + 1)
            );
        }
    }

    mineBlockchain(newBlock, indexBlockchain) {
        this.blockchain[newBlock.numBlock].data = newBlock.data;
        this.blockchain[newBlock.numBlock].index = newBlock.index;
        this.blockchain[newBlock.numBlock].nonce = 0;
        const computeMoreThanOne = this.blockchain[newBlock.numBlock].mineBlock(3);
        if (!computeMoreThanOne) {
            this.blockchain[newBlock.numBlock].nonce = newBlock.nonce;
        }

        updateBlock(
            this.blockchain[newBlock.numBlock],
            "blockchain" + indexBlockchain + "" + (newBlock.numBlock + 1)
        );

        for (let i = newBlock.numBlock + 1; i < this.blockchain.length; i++) {
            this.blockchain[i].precedingHash = this.blockchain[i - 1].hash;
            this.blockchain[i].hash = this.blockchain[i].computeHash();
            this.blockchain[i].checkIfBlockMine();

            updateBlock(
                this.blockchain[i],
                "blockchain" + indexBlockchain + "" + (i + 1)
            );
        }
    }
}

module.exports = CryptoBlockchain;