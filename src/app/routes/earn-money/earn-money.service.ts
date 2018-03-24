import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RomaVaueModel, MaterialEnumModel } from './currency-symbol.model';

/**
 * 处理业务逻辑
 */
@Injectable()
export class EarnMoneyService {
    romaArabicMap: Map<string, RomaVaueModel> = new Map();
    /** 字符串设定罗马容器 */
    romaStrValueMap: Map<string, string> = new Map();
    /** 材料容器 */
    materialMap: Map<string, number> = new Map();
    /** 问题列表 */
    questionMap: Map<string, any> = new Map();


    constructor(private http: HttpClient) { }
    /**
     * 获取mock数据
     */
    getMockData() {
        this.http.get('assets/roma-numerals.json')
            .subscribe((data: RomaVaueModel[]) => {
                if (data) {
                    data.forEach(rm => {
                        const rvModel = new RomaVaueModel(
                            rm.symbol, rm.value, rm.repeatable, rm.substractable
                        );
                        this.romaArabicMap.set(rm.symbol,
                            rvModel);
                    });
                }
            }, error => {

            });
    }
    /**
     * 解析文件内容
     * @param result 内容
     */
    parseInput(result) {
        // 内容有三种情况
        // 1.特定字符串对应罗马数字
        // 2. 设定材料积分
        // 3.问题
        // 3.1 问价值多少
        // 3.2 问有多少积分
        // 3.3 不在解决范围内
        // 拆分
        const fileContent: string[] = result ? result.split('\n') : [];
        fileContent.forEach(fc => {
            this.doFileInput(fc);
        });
    }
    /**
     *
     * @param fc
     */
    doFileInput(fc) {
        if ((fc.indexOf('?') || fc.indexOf('how')) > -1) {// 问题
            this.doQuestion(fc);
        } else if (fc.indexOf(MaterialEnumModel.Silver) > -1 ||
            fc.indexOf(MaterialEnumModel.Gold) > -1 ||
            fc.indexOf(MaterialEnumModel.Iron) > -1) {// 材料积分
            this.doMaterial(fc);
        } else {// 字符串设置罗马数字
            this.doRomaSet(fc);
        }
    }
    /**
     * 解析问题
     * @param str 问题
     */
    doQuestion(str) {
        this.questionMap.set(str, '');
    }
    /**
     * 解析材料
     * @param str
     */
    doMaterial(str) {
        const rSplits = str.split(' is ');
        const material = this.findMaterailByInput(str);
        // 获取有多少个材料
        const value = this.getValueByRoma(this.findRomaFromInput(rSplits[0]));
        // 提取数字
        const mCredits = rSplits[1].match(/\d+/g)[0];
        if (material) {
            // 存储进容器
            this.materialMap.set(material, mCredits / value ? mCredits / value : 0);
        }
    }
    /**
     * 查找输入的材料
     * @param str 输入
     */
    findMaterailByInput(str) {
        let marterial = '';
        if (str.indexOf(MaterialEnumModel.Silver) > -1) {
            marterial = MaterialEnumModel.Silver.toString();
        } else if (str.indexOf(MaterialEnumModel.Gold) > -1) {
            marterial = MaterialEnumModel.Gold.toString();
        } else if (str.indexOf(MaterialEnumModel.Iron) > -1) {
            marterial = MaterialEnumModel.Iron.toString();
        }
        return marterial;
    }
    /**
     * 字符串与罗马数字对应设定
     * @param str
     */
    doRomaSet(str) {
        const rSplits = str.split(' is ');
        this.romaStrValueMap.set(rSplits[0], rSplits[1]);
    }
    /**
     * 查找出罗马字符串
     * @param input 输入的字符
     */
    findRomaFromInput(input) {
        if (!input) {
            return;
        }
        const inputStrs = input.split(' ');
        let reuslt = '';
        for (let i = 0; i < inputStrs.length; i++) {
            const str = inputStrs[i];
            if (this.romaStrValueMap.get(str)) {
                reuslt = reuslt + this.romaStrValueMap.get(str);
            }
        }
        return reuslt;
    }

    /**
     * 得到每种材料（Silver，Gold，Iron）的积分
     * @param str
     */
    getMaterilPerCurrence(str) {
        // 找出组合罗马字符串
        const romaStr = this.findRomaFromInput(str);
        // 得到阿拉伯的值
        const romaValue = this.getValueByRoma(romaStr);
        // 截取数字
        const num = str.match(/\d+/g)[0];
        if (romaValue !== 0) {
            return Number(num) / romaValue;
        }
        return 0;
    }
    /**
     * 根据规则计算出罗马数字串的值
     * @param romaStr 罗马数字组成的字符串
     */
    getValueByRoma(romaStr: string) {
        let amountV = 0;
        let preRoma: RomaVaueModel;
        let repeatCounter = 0;
        // 遍历罗马数字串
        for (let i = 0; i < romaStr.length; i++) {
            // 当前的罗马数字对象
            const currRoma = this.romaArabicMap.get(romaStr.charAt(i));
            // 当前罗马数字所代表的值
            const currValue = currRoma.value;
            // 下一个罗马数字对象
            const nextRoma = this.romaArabicMap.get(romaStr.charAt(i + 1));

            if (!currRoma) {
                amountV = 0;
                continue;
            }
            // 先验证与下一个的大小,
            if (currRoma.compareTo(nextRoma)) {
                // 比下一个字符小
                if (currRoma.canBeStustractByNext(nextRoma)) {
                    amountV += nextRoma.value - currRoma.value;
                } else {
                    amountV += currRoma.value;
                }
                i++;
            } else if (currRoma.isEquals(preRoma)) {
                repeatCounter++;
                if (!currRoma.repeatable) {// 如果当前的罗马数字不能重复那么结束循环返回异常数字
                    amountV = 0;
                    break;
                } else if (repeatCounter > 2) { // 重复到第三次的时候，比较是否与第四个字符较小
                    if (currRoma.compareTo(nextRoma)) {
                        amountV += currRoma.value;
                    } else {
                        amountV = 0;
                        break;
                    }
                } else {
                    amountV += currRoma.value;
                }
            } else {
                amountV += currRoma.value;
            }
            preRoma = currRoma;
        }
        return amountV;
    }
    /**
     * 计算积分
     */
    getCreditsByMaterial(q) {
        const romaStr = this.findRomaFromInput(q);
        if (romaStr) {
            const amount = this.getValueByRoma(romaStr);
            const mValue = this.materialMap.get(this.findMaterailByInput(q));
            return amount * mValue ? amount * mValue : 0;
        }
        return 0;
    }
    /**
     * 处理问题
     */
    dealQuestion() {
        const newQAMap = new Map();
        this.questionMap.forEach((value, key) => {
            // 计算总材料积分
            if (key.indexOf('how many Credits') > -1) {
                value = this.getCreditsByMaterial(key);
            } else if (key.indexOf('how much is') > -1) {
                const romaStr = this.findRomaFromInput(key);
                value = this.getValueByRoma(romaStr);
                // return getValueByRoma(strParse(str));
            } else {
                // 返回错误信息
                value = 'I have no idea what you are talking about';
            }
            newQAMap.set(key, value);
        });
        return newQAMap;
    }
}
