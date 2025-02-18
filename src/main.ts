console.log("Щоб розпочати, уведіть таку функцію: triangle(значення1, 'тип1', значення2, 'тип2')");
console.log("Типи, які ви можете задати:  ");
console.log("•\tleg - катет");
console.log("•\thypotenuse - гіпотенуза");
console.log("•\tadjacent angle - прилеглий до катета кут");
console.log("•\topposite angle - протилежний до катета кут");
console.log("•\tangle - один з двох гострих кутів");

type TriangleType = "leg" | "hypotenuse" | "adjacent angle" | "opposite angle" | "angle";

type TriangleResult = "success" | "failed";

function triangle(arg1: number, type1: TriangleType, arg2: number, type2: TriangleType): TriangleResult {
    console.log(`\n>-- ${type1} = ${arg1} | ${type2} = ${arg2} --<`);

    let a: number | undefined, b: number | undefined, c: number | undefined;
    let alpha: number | undefined, beta: number | undefined;
    
    let countHypotenuse = 0, countAngles = 0;

    const dictVal = [arg1, arg2];
    const dictType: TriangleType[] = [type1, type2];
    
    for (let i = 0; i < 2; i++) {
        const value = dictVal[i];
        const type = dictType[i];
        
        switch (type) {
            case "leg":
                if (a === undefined) a = value;
                else b = value;
                break;
            case "hypotenuse":
                c = value;
                countHypotenuse++;
                break;
            case "adjacent angle":
            case "opposite angle":
            case "angle":
                countAngles++;
                break;
            default:
                console.log("Невідомий тип");
                return "failed";
        }
    }

    for (let i = 0; i < 2; i++) {
        const value = dictVal[i];
        const type = dictType[i];
        
        switch (type) {
            case "adjacent angle":
                beta = value;
                alpha = 90 - beta;
                break;
            case "opposite angle":
            case "angle":
                alpha = value;
                beta = 90 - alpha;
                break;
        }
    }

    if (countAngles === 2 || countHypotenuse === 2) {
        console.log("Неправильний набір аргументів.");
        return "failed";
    }

    if (arg1 <= 0 || arg2 <= 0) {
        console.log("Значення аргументів мають бути додатними.");
        return "failed";
    }
    if (alpha !== undefined && (alpha >= 90 || alpha <= 0)) {
        console.log("Некоректні значення кутів.");
        return "failed";
    }

    if (a !== undefined && b !== undefined) {
        c = Math.sqrt(a * a + b * b);
        alpha = Math.acos((b * b + c * c - a * a) / (2 * b * c)) * 180 / Math.PI;
        beta = 90 - alpha;
    } else if (a !== undefined && c !== undefined) {
        b = Math.sqrt(c * c - a * a);
        alpha = Math.acos((b * b + c * c - a * a) / (2 * b * c)) * 180 / Math.PI;
        beta = 90 - alpha;
    } else if (a !== undefined && alpha !== undefined) {
        b = a * Math.tan((90 - alpha) * Math.PI / 180);
        c = Math.sqrt(a * a + b * b);
    } else if (alpha !== undefined && c !== undefined) {
        b = c * Math.cos(alpha * Math.PI / 180);
        a = c * Math.sin(alpha * Math.PI / 180);
    }

    if (!a || !b || !c || !alpha || !beta) {
        console.log("Некоректні розрахунки.");
        return "failed";
    }

    console.log(`Катет a: ${a.toFixed(3)}`);
    console.log(`Катет b: ${b.toFixed(3)}`);
    console.log(`Гіпотенуза (c): ${c.toFixed(3)}`);
    console.log(`Гострий кут alpha: ${alpha.toFixed(3)} градуси`);
    console.log(`Гострий кут beta: ${beta.toFixed(3)} градуси`);

    return "success";
}
