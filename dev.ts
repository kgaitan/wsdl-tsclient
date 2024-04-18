import { parseAndGenerate, ModelPropertyNaming } from "./src";

// parseAndGenerate("./soap_files/FLIGHTS_JAVASCRIPT_TST_2.8/FLIGHTS_JAVASCRIPT_TST_2.8_Technical.wsdl", "./generated/", {
//     modelNamePreffix: "DIMD_RS_",
// });


// parseAndGenerate("./soap_files/FLIGHTS_JAVASCRIPT_TST_2.5/FLIGHTS_JAVASCRIPT_TST_2.5_Technical.wsdl", "./generated/", {
//     modelNamePreffix: "ADME_",
//     modelNameSuffix: "", 
// });

parseAndGenerate("./soap_files/ONLY_FLIGHT_TST_1.0/ONLY_FLIGHT_PDT_Travel_Management_1.12_4.0.wsdl", "./generated/", {
    modelNamePreffix: "TSL_"
});
