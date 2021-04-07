import test from "tape";
import { existsSync } from "fs";
import { parseAndGenerate } from "../../../src";
import { Logger } from "../../../src/utils/logger";

test("recursive/A", async t => {
    Logger.disabled();

    const input = "./test/resources/recursive/A.xsd";
    const outdir = "./test/generated/recursive";

    t.test("generate wsdl client", async t => {
        await parseAndGenerate(input, outdir);
        t.end();
    });

    // t.test("check definitions", async t => {
    //     t.equal(existsSync(`${outdir}/A/definitions/BankSvcRq.ts`), true);
    //     t.equal(existsSync(`${outdir}/A/definitions/BankSvcRs.ts`), true);
    //     t.equal(existsSync(`${outdir}/A/definitions/ARq.ts`), true);
    //     t.equal(existsSync(`${outdir}/A/definitions/ARs.ts`), true);
    //     t.equal(existsSync(`${outdir}/A/definitions/PaymentRq.ts`), true);
    //     t.equal(existsSync(`${outdir}/A/definitions/PaymentRs.ts`), true);
    //     t.end();
    // });

});