require('dotenv').config({ path: './config/.env' });
const express = require("express")
const cors = require("cors");
const connection = require("./config/db");
const FeeStructureRoutes = require("./routes/FeeStructureRoutes")
const BranchRoutes = require("./routes/BranchRoutes")
const CompanyRoutes = require("./routes/CompanyRoutes")

const BankRoutes = require("./routes/BankRoutes")
const ClassRoutes = require("./routes/ClassRoutes")
const ClassWiseFeeStructureRoutes = require("./routes/ClassWiseFeeStructureRoutes")
const SectionRoutes = require("./routes/SectionRoutes")
const QuarterRoutes = require("./routes/QuarterRoutes")
const StudentRoutes = require("./routes/StudentRoutes")
const SchoolFeeDueRoutes = require("./routes/SchoolFeeDueRoutes")

const app = express();
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from your frontend
    // methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());

connection();


app.use("/setups/common", BranchRoutes)
app.use("/setups/common", CompanyRoutes)

// setup
app.use("/setups/school", FeeStructureRoutes);
app.use("/setups/school", ClassRoutes)
app.use("/setups/school", ClassWiseFeeStructureRoutes)
app.use("/setups/school", SectionRoutes)
app.use("/setups/school", QuarterRoutes)
app.use("/setups/school", StudentRoutes)
app.use("/setups/school", BankRoutes)

// transactions
app.use("/transactions",SchoolFeeDueRoutes )

app.listen(process.env.PORT, () => {
    console.log(`listening at port  ${process.env.PORT}`)
})