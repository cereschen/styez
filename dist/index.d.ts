export declare enum OneNumMap {
    'w' = "width",
    'h' = "height",
    'lh' = "line-height",
    'maxh' = "max-height",
    'minh' = "min-height",
    'maxw' = "max-width",
    'mt' = "margin-top",
    'mb' = "margin-bottom",
    'ml' = "margin-left",
    'mr' = "margin-right",
    'pt' = "padding-top",
    'pb' = "padding-bottom",
    'pl' = "padding-left",
    'pr' = "padding-right",
    'fz' = "font-size",
    't' = "top",
    'b' = "bottom",
    'l' = "left",
    'r' = "right",
    'zi' = "z-index"
}
export declare enum fourMap {
    'br' = "border-radius",
    'm' = "margin",
    'p' = "padding"
}
export declare const oneWordMap: {
    pos: {
        outWord: string;
        map: {
            a: string;
            r: string;
            f: string;
        };
    };
    us: {
        outWord: string;
        map: {
            a: string;
            n: string;
            all: string;
            t: string;
            c: string;
        };
    };
    pe: {
        outWord: string;
        map: {
            a: string;
            n: string;
        };
    };
    cur: {
        outWord: string;
        map: {
            p: string;
            pg: string;
            n: string;
            d: string;
            m: string;
        };
    };
    ta: {
        outWord: string;
        map: {
            l: string;
            r: string;
            c: string;
            j: string;
            i: string;
        };
    };
};
export declare function transform(...style: string[]): string;
export declare function styez(arr: TemplateStringsArray, ...arr1: unknown[]): string;
