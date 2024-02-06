import { parseAndGenerate, ModelPropertyNaming } from "./src";

parseAndGenerate("./soap_files/FLIGHTS_JAVASCRIPT_TST_1.2/FLIGHTS_JAVASCRIPT_TST_1.2_Technical.wsdl", "./generated/", {
    modelNamePreffix: "FMPTBS_RS_",
    modelPropertyNaming: ModelPropertyNaming.camelCase,
});
