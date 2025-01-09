import { configureStore } from "@reduxjs/toolkit";
import { bankSetupAPI } from "./API/setup/school/bankSetupAPI";
import { sectionSetupAPI } from "./API/setup/school/sectionSetupAPI";
import { classSetupAPI } from "./API/setup/school/classSetupAPI";
import { quarterSetupAPI } from "./API/setup/school/quarterSetupAPI";
import { feeStructureAPI } from "./API/setup/school/feeStructureAPI";
import { branchSetupAPI } from "./API/setup/school/branchSetupAPI";
import { companySetupAPI } from "./API/setup/school/companySetupAPI";
import { studentSetupAPI } from "./API/setup/school/studentSetupAPI";
import { classWiseFeeStructureSetupAPI } from "./API/setup/school/classWIseFeeStructureAPI";
import { schoolFeeDueSetupAPI } from "./API/setup/school/schoolFeeDueApi";

const Store = configureStore({
    reducer: {
        [bankSetupAPI.reducerPath]: bankSetupAPI.reducer,
        [sectionSetupAPI.reducerPath]: sectionSetupAPI.reducer,
        [classSetupAPI.reducerPath]: classSetupAPI.reducer,
        [quarterSetupAPI.reducerPath]: quarterSetupAPI.reducer,
        [feeStructureAPI.reducerPath]: feeStructureAPI.reducer,
        [branchSetupAPI.reducerPath]: branchSetupAPI.reducer,
        [companySetupAPI.reducerPath]: companySetupAPI.reducer,
        [studentSetupAPI.reducerPath]: studentSetupAPI.reducer,
        [classWiseFeeStructureSetupAPI.reducerPath]: classWiseFeeStructureSetupAPI.reducer,
        [schoolFeeDueSetupAPI.reducerPath]: schoolFeeDueSetupAPI.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        [bankSetupAPI.middleware, sectionSetupAPI.middleware, classSetupAPI.middleware, quarterSetupAPI.middleware,
        feeStructureAPI.middleware, companySetupAPI.middleware, branchSetupAPI.middleware, studentSetupAPI.middleware,
        classWiseFeeStructureSetupAPI.middleware,schoolFeeDueSetupAPI.middleware
        ]
    ),
},
)
export default Store