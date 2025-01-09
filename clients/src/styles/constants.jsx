const SIDENAV_ITEMS = [
    {
        title: 'Setups',
        path: '/setup',
        submenu: true,
        subMenuItems: [
            {
                title: 'Common', path: '/setup', subsubmenu: true,
                subsubMenuItems: [
                    { title: 'Fee Structure', path: '/setup/feeStructure' },
                    { title: 'Class Setup', path: '/setup/classSetup' },
                    { title: 'Section Setup', path: '/setup/sectionSetup' },
                    { title: 'Student Registration', path: '/setup/studentSetup' },
                    { title: 'Period Setup/Quarter', path: '/setup/quarterSetup' },
                    { title: 'Bank Setup', path: '/setup/bankSetup' }
                ]
            },
            { title: 'Accounts', path: '/setup/classSetup' },
            { title: 'Inventory', path: '/setup/sectionSetup' },
            { title: 'Payroll', path: '/setup/studentSetup' },
            { title: 'HR & Admin', path: '/setup/quarterSetup' },
            { title: 'Payable', path: '/setup/bankSetup' },
            {
                title: 'Fix Asset', path: '/setup/bankSetup',
            },
            {
                title: 'School Setup', path: '/setup/bankSetup', subsubmenu: true,
                subsubMenuItems: [
                    { title: 'Fee Structure', path: '/setup/school/feeStructure' },
                    { title: 'Class Setup', path: '/setup/school/classSetup' },
                    { title: 'Section Setup', path: '/setup/school/sectionSetup' },
                    { title: 'Student Registration', path: '/setup/school/studentSetup' },
                    { title: 'Period Setup/Quarter', path: '/setup/school/quarterSetup' },
                    { title: 'Bank Setup', path: '/setup/school/bankSetup' },
                    { title: 'Branch Setup', path: '/setup/school/branchSetup' },
                    { title: 'Class wise fee structure', path: '/setup/school/classWiseFeeStructure' }
                ]
            }
        ],
    },
    {
        title: 'Transactions',
        path: '/',
        submenu: true,
    },
    {
        title: 'Document View',
        path: '/',
        submenu: true,
    },
    {
        title: 'Reports',
        path: '/',
        submenu: true
    },
    {
        title: 'Admin',
        path: '/',
        submenu: true,
        // subMenuItems: [
        // ],
    }

]


const FeeDefaultTable = [
    {
        feesID: 1,
        feeDescription: "",
        amount: 8000,
        comapnyCode: {
            title: " Madarasa",
            code: 12
        },
        branchCode: {
            title: "Lake view Park",
            code: 13

        },
        isActive: true
    },
    {
        feesID: 1,
        feeDescription: "",
        amount: 8000,
        comapnyCode: {
            title: " Madarasa",
            code: 12
        },
        branchCode: {
            title: "Lake view Park",
            code: 13

        },
        isActive: true
    }
    , {
        feesID: 1,
        feeDescription: "",
        amount: 8000,
        comapnyCode: {
            title: " Madarasa",
            code: 12
        },
        branchCode: {
            title: "Lake view Park",
            code: 13

        },
        isActive: true
    }, {
        feesID: 1,
        feeDescription: "",
        amount: 8000,
        comapnyCode: {
            title: " Madarasa",
            code: 12
        },
        branchCode: {
            title: "Lake view Park",
            code: 13

        },
        isActive: true
    }, {
        feesID: 1,
        feeDescription: "",
        amount: 8000,
        comapnyCode: {
            title: " Madarasa",
            code: 12
        },
        branchCode: {
            title: "Lake view Park",
            code: 13

        },
        isActive: true
    }, {
        feesID: 1,
        feeDescription: "",
        amount: 8000,
        comapnyCode: {
            title: " Madarasa",
            code: 12
        },
        branchCode: {
            title: "Lake view Park",
            code: 13

        },
        isActive: true
    } ,{
        feesID: 1,
        feeDescription: "",
        amount: 8000,
        comapnyCode: {
            title: " Madarasa",
            code: 12
        },
        branchCode: {
            title: "Lake view Park",
            code: 13

        },
        isActive: true
    }, {
        feesID: 1,
        feeDescription: "",
        amount: 8000,
        comapnyCode: {
            title: " Madarasa",
            code: 12
        },
        branchCode: {
            title: "Lake view Park",
            code: 13

        },
        isActive: true
    }, {
        feesID: 1,
        feeDescription: "",
        amount: 8000,
        comapnyCode: {
            title: " Madarasa",
            code: 12
        },
        branchCode: {
            title: "Lake view Park",
            code: 13

        },
        isActive: true
    }, {
        feesID: 1,
        feeDescription: "",
        amount: 8000,
        comapnyCode: {
            title: " Madarasa",
            code: 12
        },
        branchCode: {
            title: "Lake view Park",
            code: 13

        },
        isActive: true
    },
    {
        feesID: 1,
        feeDescription: "",
        amount: 8000,
        comapnyCode: {
            title: " Madarasa",
            code: 12
        },
        branchCode: {
            title: "Lake view Park",
            code: 13

        },
        isActive: true
    }, {
        feesID: 1,
        feeDescription: "",
        amount: 8000,
        comapnyCode: {
            title: " Madarasa",
            code: 12
        },
        branchCode: {
            title: "Lake view Park",
            code: 13

        },
        isActive: true
    }, {
        feesID: 1,
        feeDescription: "",
        amount: 8000,
        comapnyCode: {
            title: " Madarasa",
            code: 12
        },
        branchCode: {
            title: "Lake view Park",
            code: 13

        },
        isActive: true
    }, {
        feesID: 1,
        feeDescription: "",
        amount: 8000,
        comapnyCode: {
            title: " Madarasa",
            code: 12
        },
        branchCode: {
            title: "Lake view Park",
            code: 13

        },
        isActive: true
    }
]

module.exports = { SIDENAV_ITEMS,FeeDefaultTable }