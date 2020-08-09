class RollingHash {
    hashValue: number;
    alphabetSize: number;
    prime: number;
    charCount: number;

    constructor(){
        this.alphabetSize = 256;
        this.prime = 101
        this.charCount = 0;
        this.hashValue = 0 % this.prime
    }

    getH = () => {
        return Math.pow(this.alphabetSize, this.charCount - 1) % this.prime
    }
    
    add = (val: number):void => {
        this.hashValue = (this.hashValue * this.alphabetSize + val) % this.prime
        this.charCount++
    }
    
    skip = (val: number): void => {
        const h = this.getH()
        this.hashValue = (this.hashValue - val * h) % this.prime
        if(this.hashValue < 0){
            this.hashValue = this.hashValue + this.prime
        }
        this.charCount--
    }

    hash = (): number => {
        return this.hashValue;
    }
}

const rabinKarp = (pattern: number[], text:number[]): number => {
    if(pattern.length > text.length){
        return -1;
    }

    const rp = new RollingHash()
    const rt = new RollingHash()

    for(let i=0; i < pattern.length; i++){
        rp.add(pattern[i])
        rt.add(text[i])
    }

    if(rp.hash() === rt.hash() && areSameStrs(pattern, text, 0)){
        return 0;
    }

    for(let i = 0; i< (text.length - pattern.length) + 1; i++){
        if(rp.hash() === rt.hash() && areSameStrs(pattern, text, i)){
            return i;
        }
        rt.skip(text[i])
        rt.add(text[i+pattern.length])
    }

    return -1;
}

const areSameStrs = (s1: number[], s2: number[], textIndex: number) => {
    for(let i = 0; i<s1.length; i++){
        if(s1[i] !== s2[textIndex]){
            return false;
        }
        textIndex++;
    }
    return true;
}

export default rabinKarp