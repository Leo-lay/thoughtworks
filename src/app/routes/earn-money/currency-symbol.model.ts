/**
 * 货币符号实体
 */
export class RomaVaueModel {
    /** 货币符号 */
    symbol?: string;
    /** 特定的字符串 */
    value?: number;
    /** 是否可重复 */
    repeatable?: boolean;
    /** 是否可被减 */
    substractable?: boolean;

    constructor(symbol?, value?, repeatable?, substractable?) {
        this.symbol = symbol;
        this.value = value;
        this.repeatable = repeatable;
        this.substractable = substractable;
    }

    /**
     * 比较value大小
     * @param rv
     */
    compareTo(rv: RomaVaueModel) {
        return rv ? rv.value > this.value : false;
    }

    /**
     * 是否对象相等
     * @param rv
     */
    isEquals(rv: RomaVaueModel) {
        if (!rv) { return false; }
        return rv.symbol === this.symbol &&
            rv.value === this.value &&
            rv.repeatable === this.repeatable &&
            rv.substractable === this.substractable;
    }

    /**
     * 
     */
    canBeStustractByNext(rvm: RomaVaueModel) {
        let canStract = false;
        switch (this.symbol) {
            case 'I':
                canStract = rvm.symbol === 'V' || rvm.symbol === 'X';
                break;
            case 'X':
                canStract = rvm.symbol === 'L' || rvm.symbol === 'C';
                break;
            case 'C':
                canStract = rvm.symbol === 'D' || rvm.symbol === 'M';
                break;
        }
        return canStract;
    }
}


/**
 * 可以当做罗马数字&阿拉伯数字，也可以当作材料Silver，Gold ，Iron和积分
 */
export interface ValueNameModel {
    /**  name*/
    name?: string;
    /** value */
    value?: number;
}

/**
 * 材料
 */
export enum MaterialEnumModel {
    Silver = <any>'Silver',
    Gold = <any>'Gold',
    Iron = <any>'Iron'
}


export enum InputFileTypeEnumModel {
    /** 设置字符串 */
    Roma_Value_Set = <any>'Roma_Value_Set',
    /** 设定材料 */
    Material_Value_Set = <any>'Material_Value_Set',
    /** 问题价值多少 */
    Q_Much_Value = <any>'Q_Much_Value',
    /** 多少积分 */
    Q_Many_Credits = <any>'Q_Many_Credits',
}

