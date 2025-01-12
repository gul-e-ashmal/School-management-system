import React, { useEffect, useState } from 'react'
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf"
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';



// Create styles
const styles = StyleSheet.create({
  page: {
    width: "100vw",
    // maxWidth: 1000,
    height: "400 pt",
    flexDirection: 'row',
    backgroundColor: ''
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    fontSize: "12",
    // fontFamily:"Times New Roman"
  },
  date: {
    width: "100%",
    fontSize: "8",
    borderColor: "black",
    borderWidth: "1",
    padding: "3",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "2",
    marginBottom: "2"
  },
  studentInfo: {
    fontSize: "9",

  },
  fee: {

  },
  table: {
    // width: "90%",
    marginTop: "2",
    marginBottom: "2",
    fontSize: "9"
  },
  tableHeader: {

  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "center",
    borderRightWidth: "1"
  },
  tableCell: {
  },
  tableCellLast: {
    padding: 5,
    borderRightWidth: 0,
    borderColor: '#000',
  },

});

const FeeSlipInvoice = ({ data, length }) => {


  return (
    <Document>
      {
        data?.schoolfeedue?.map((item, index) => {
          return <Page size={{ width: 841.89, height: 600.55 }} style={styles.page} key={index}>
            <View style={styles.section}>
              <Text style={{ margin: "2", alignSelf: "center" }}>{"3"}</Text>
              <Text style={{ margin: "2", alignSelf: "center", fontWeight: "bold" }}>{"Bank Copy".toUpperCase()}</Text>
              <Text style={{ margin: "2", alignSelf: "center" }}>{item?.year.toUpperCase()}</Text>
              <Text style={{ margin: "2", alignSelf: "center" }}>{"Bank name".toUpperCase()}</Text>
              <Text style={{ margin: "2", alignSelf: "center" }}>{"Bank address".toUpperCase()}</Text>
              <Text style={{ margin: "2", alignSelf: "center" }}>AC # {"Bank address".toUpperCase()}</Text>

              <Text style={{ margin: "2", alignSelf: "center" }}>{item?.company?.name.toUpperCase()}</Text>
              <Text style={{ margin: "2", alignSelf: "center" }}>AC # {item?.branch?.name.toUpperCase()}</Text>

              <View style={[styles.date, {}]}>
                <Text style={{}}>Issue date: {item?.issueDate?.slice(0, 10)}</Text>
                <Text style={{}}>Due date: {item?.dueDate?.slice(0, 10)}</Text>
              </View>

              <View style={styles.studentInfo}>
                <Text style={{ margin: "2" }}> <Text style={{ fontSize: "10", marginRight: "2" }}>Roll No :</Text>  {item?.student?.rollNo} </Text>
                <Text style={{ margin: "2" }}> <Text style={{ fontSize: "10", marginRight: "2" }}>Name : </Text>  {item?.student?.name}</Text>
                <Text style={{ margin: "2" }}> <Text style={{ fontSize: "10", marginRight: "2" }}>D/S of : </Text>  {item?.student?.fatherName}</Text>
                <View style={{ flexDirection: "row", margin: "2" }}>
                  <Text style={{}}> <Text style={{ fontSize: "10", marginRight: "2" }}>Class : </Text>  {item?.class?.name}   </Text>
                  <Text style={{ marginLeft: "4" }}> <Text style={{ marginRight: "2", fontSize: "10" }}>Section : </Text>  {item?.section?.name}</Text>
                </View>
              </View >

              <Text style={{ margin: "2", fontSize: "9" }}> <Text style={{ fontWeight: "bold", width: 200, fontSize: "10" }}>For the month of : </Text>  {item?.period?.name} </Text>


              <View style={[styles.table, {}]}>

                <View style={[{ flexDirection: "row", padding: "1", borderWidth: "1", fontWeight: "bold", justifyContent: "space-between", fontSize: "11" }]}>
                  <View style={[{}]}>
                    <Text style={[{ padding: "3", paddingHorizontal: "1" }]}> Detail of Dues </Text>
                  </View>
                  <View style={[{ width: 50, alignSelf: "flex-end", borderLeftWidth: "1", paddingHorizontal: "2" }]}>
                    <Text style={[{ padding: "3", paddingHorizontal: "1" }]}> Amount </Text>
                  </View>
                </View>

                {
                  Array.from({ length: 12 }).map((_, i) => {
                    return <View style={{ flexDirection: "row", padding: "1", fontSize: "9", borderBottomWidth: "1", justifyContent: "space-between" }}>
                      <View style={[{}]}>
                        <Text style={[{ paddingVertical: "3", paddingHorizontal: "1" }]}> {item?.fee[i]?._id?.feeName} </Text>
                      </View>
                      <View style={[{ width: 50, alignSelf: "flex-end", borderLeftWidth: "1", paddingHorizontal: "2" }]}>
                        <Text style={[{ paddingVertical: "3", paddingHorizontal: "1" }]}> {item?.fee[i]?.amount} </Text>
                      </View>
                    </View>
                  })
                }
              </View>

              <View style={{ marginTop: "5" }}>
                <View style={[{ flexDirection: "row", padding: "1", borderWidth: "1", fontWeight: "bold", justifyContent: "space-between", fontSize: "11" }]}>
                  <View style={[{}]}>
                    <Text style={[{ padding: "3", paddingHorizontal: "1" }]}> Total Amount Payable </Text>
                  </View>
                  <View style={[{ width: 50, alignSelf: "flex-end", borderLeftWidth: "1", paddingHorizontal: "2" }]}>
                    <Text style={[{ padding: "3", paddingHorizontal: "1" }]}>{item?.fee?.reduce((sum, i) => sum + i.amount, 0)} </Text>
                  </View>
                </View>
              </View>

              <View style={{ marginTop: "2" }}>
                <View style={[{ flexDirection: "row", padding: "1", borderWidth: "1", fontWeight: "bold", justifyContent: "space-between", fontSize: "11" }]}>
                  <View style={[{}]}>
                    <Text style={[{ padding: "3", paddingHorizontal: "1" }]}> Total Amount payable after due date  </Text>
                  </View>
                  <View style={[{ width: 50, alignSelf: "flex-end", borderLeftWidth: "1", paddingHorizontal: "2" }]}>
                    <Text style={[{ padding: "3", paddingHorizontal: "1" }]}> {item?.fee?.reduce((sum, i) => sum + i.amount, 0) + 100} </Text>
                  </View>
                </View>
              </View>

            </View>


            <View style={styles.section}>
              <Text style={{ margin: "3", alignSelf: "center" }}>{"2"}</Text>
              <Text style={{ margin: "3", alignSelf: "center" }}>{"College Copy".toUpperCase()}</Text>
              <Text style={{ margin: "2", alignSelf: "center" }}>{item?.year.toUpperCase()}</Text>
              <Text style={{ margin: "2", alignSelf: "center" }}>{"Bank name".toUpperCase()}</Text>
              <Text style={{ margin: "2", alignSelf: "center" }}>{"Bank address".toUpperCase()}</Text>
              <Text style={{ margin: "2", alignSelf: "center" }}>AC # {"Bank address".toUpperCase()}</Text>

              <Text style={{ margin: "2", alignSelf: "center" }}>{item?.company?.name.toUpperCase()}</Text>
              <Text style={{ margin: "2", alignSelf: "center" }}>AC # {item?.branch?.name.toUpperCase()}</Text>

              <View style={[styles.date, {}]}>
                <Text style={{}}>Issue date: {item?.issueDate?.slice(0, 10)}</Text>
                <Text style={{}}>Due date: {item?.dueDate?.slice(0, 10)}</Text>
              </View>

              <View style={styles.studentInfo}>
                <Text style={{ margin: "2" }}> <Text style={{ fontSize: "10", marginRight: "2" }}>Roll No :</Text>  {item?.student?.rollNo} </Text>
                <Text style={{ margin: "2" }}> <Text style={{ fontSize: "10", marginRight: "2" }}>Name : </Text>  {item?.student?.name}</Text>
                <Text style={{ margin: "2" }}> <Text style={{ fontSize: "10", marginRight: "2" }}>D/S of : </Text>  {item?.student?.fatherName}</Text>
                <View style={{ flexDirection: "row", margin: "2" }}>
                  <Text style={{}}> <Text style={{ fontSize: "10", marginRight: "2" }}>Class : </Text>  {item?.class?.name}   </Text>
                  <Text style={{ marginLeft: "4" }}> <Text style={{ marginRight: "2", fontSize: "10" }}>Section : </Text>  {item?.section?.name}</Text>
                </View>
              </View >

              <Text style={{ margin: "2", fontSize: "9" }}> <Text style={{ fontWeight: "bold", width: 200, fontSize: "10" }}>For the month of : </Text>  {item?.period?.name} </Text>


              <View style={[styles.table, {}]}>

                <View style={[{ flexDirection: "row", padding: "1", borderWidth: "1", fontWeight: "bold", justifyContent: "space-between", fontSize: "11" }]}>
                  <View style={[{}]}>
                    <Text style={[{ padding: "3", paddingHorizontal: "1" }]}> Detail of Dues </Text>
                  </View>
                  <View style={[{ width: 50, alignSelf: "flex-end", borderLeftWidth: "1", paddingHorizontal: "2" }]}>
                    <Text style={[{ padding: "3", paddingHorizontal: "1" }]}> Amount </Text>
                  </View>
                </View>

                {
                  Array.from({ length: 12 }).map((_, i) => {
                    return <View style={{ flexDirection: "row", padding: "1", fontSize: "9", borderBottomWidth: "1", justifyContent: "space-between" }}>
                      <View style={[{}]}>
                        <Text style={[{ paddingVertical: "3", paddingHorizontal: "1" }]}> {item?.fee[i]?._id?.feeName} </Text>
                      </View>
                      <View style={[{ width: 50, alignSelf: "flex-end", borderLeftWidth: "1", paddingHorizontal: "2" }]}>
                        <Text style={[{ paddingVertical: "3", paddingHorizontal: "1" }]}> {item?.fee[i]?.amount} </Text>
                      </View>
                    </View>
                  })
                }
              </View>

              <View style={{ marginTop: "5" }}>
                <View style={[{ flexDirection: "row", padding: "1", borderWidth: "1", fontWeight: "bold", justifyContent: "space-between", fontSize: "11" }]}>
                  <View style={[{}]}>
                    <Text style={[{ padding: "3", paddingHorizontal: "1" }]}> Total Amount Payable </Text>
                  </View>
                  <View style={[{ width: 50, alignSelf: "flex-end", borderLeftWidth: "1", paddingHorizontal: "2" }]}>
                    <Text style={[{ padding: "3", paddingHorizontal: "1" }]}>{item?.fee?.reduce((sum, i) => sum + i.amount, 0)} </Text>
                  </View>
                </View>
              </View>

              <View style={{ marginTop: "2" }}>
                <View style={[{ flexDirection: "row", padding: "1", borderWidth: "1", fontWeight: "bold", justifyContent: "space-between", fontSize: "11" }]}>
                  <View style={[{}]}>
                    <Text style={[{ padding: "3", paddingHorizontal: "1" }]}> Total Amount payable after due date  </Text>
                  </View>
                  <View style={[{ width: 50, alignSelf: "flex-end", borderLeftWidth: "1", paddingHorizontal: "2" }]}>
                    <Text style={[{ padding: "3", paddingHorizontal: "1" }]}> {item?.fee?.reduce((sum, i) => sum + i.amount, 0) + 100} </Text>
                  </View>
                </View>
              </View>

            </View>


            <View style={styles.section}>
              <Text style={{ margin: "3", alignSelf: "center" }}>{"1"}</Text>
              <Text style={{ margin: "3", alignSelf: "center" }}>{"Parents Copy".toUpperCase()}</Text>
              <Text style={{ margin: "2", alignSelf: "center" }}>{item?.year.toUpperCase()}</Text>
              <Text style={{ margin: "2", alignSelf: "center" }}>{"Bank name".toUpperCase()}</Text>
              <Text style={{ margin: "2", alignSelf: "center" }}>{"Bank address".toUpperCase()}</Text>
              <Text style={{ margin: "2", alignSelf: "center" }}>AC # {"Bank address".toUpperCase()}</Text>

              <Text style={{ margin: "2", alignSelf: "center" }}>{item?.company?.name.toUpperCase()}</Text>
              <Text style={{ margin: "2", alignSelf: "center" }}>AC # {item?.branch?.name.toUpperCase()}</Text>

              <View style={[styles.date, {}]}>
                <Text style={{}}>Issue date: {item?.issueDate?.slice(0, 10)}</Text>
                <Text style={{}}>Due date: {item?.dueDate?.slice(0, 10)}</Text>
              </View>

              <View style={styles.studentInfo}>
                <Text style={{ margin: "2" }}> <Text style={{ fontSize: "10", marginRight: "2" }}>Roll No :</Text>  {item?.student?.rollNo} </Text>
                <Text style={{ margin: "2" }}> <Text style={{ fontSize: "10", marginRight: "2" }}>Name : </Text>  {item?.student?.name}</Text>
                <Text style={{ margin: "2" }}> <Text style={{ fontSize: "10", marginRight: "2" }}>D/S of : </Text>  {item?.student?.fatherName}</Text>
                <View style={{ flexDirection: "row", margin: "2" }}>
                  <Text style={{}}> <Text style={{ fontSize: "10", marginRight: "2" }}>Class : </Text>  {item?.class?.name}   </Text>
                  <Text style={{ marginLeft: "4" }}> <Text style={{ marginRight: "2", fontSize: "10" }}>Section : </Text>  {item?.section?.name}</Text>
                </View>
              </View >

              <Text style={{ margin: "2", fontSize: "9" }}> <Text style={{ fontWeight: "bold", width: 200, fontSize: "10" }}>For the month of : </Text>  {item?.period?.name} </Text>


              <View style={[styles.table, {}]}>

                <View style={[{ flexDirection: "row", padding: "1", borderWidth: "1", fontWeight: "bold", justifyContent: "space-between", fontSize: "11" }]}>
                  <View style={[{}]}>
                    <Text style={[{ padding: "3", paddingHorizontal: "1" }]}> Detail of Dues </Text>
                  </View>
                  <View style={[{ width: 50, alignSelf: "flex-end", borderLeftWidth: "1", paddingHorizontal: "2" }]}>
                    <Text style={[{ padding: "3", paddingHorizontal: "1" }]}> Amount </Text>
                  </View>
                </View>

                {
                  Array.from({ length: 12 }).map((_, i) => {
                    return <View style={{ flexDirection: "row", padding: "1", fontSize: "9", borderBottomWidth: "1", justifyContent: "space-between" }}>
                      <View style={[{}]}>
                        <Text style={[{ paddingVertical: "3", paddingHorizontal: "1" }]}> {item?.fee[i]?._id?.feeName} </Text>
                      </View>
                      <View style={[{ width: 50, alignSelf: "flex-end", borderLeftWidth: "1", paddingHorizontal: "2" }]}>
                        <Text style={[{ paddingVertical: "3", paddingHorizontal: "1" }]}> {item?.fee[i]?.amount} </Text>
                      </View>
                    </View>
                  })
                }
              </View>

              <View style={{ marginTop: "5" }}>
                <View style={[{ flexDirection: "row", padding: "1", borderWidth: "1", fontWeight: "bold", justifyContent: "space-between", fontSize: "11" }]}>
                  <View style={[{}]}>
                    <Text style={[{ padding: "3", paddingHorizontal: "1" }]}> Total Amount Payable </Text>
                  </View>
                  <View style={[{ width: 50, alignSelf: "flex-end", borderLeftWidth: "1", paddingHorizontal: "2" }]}>
                    <Text style={[{ padding: "3", paddingHorizontal: "1" }]}>{item?.fee?.reduce((sum, i) => sum + i.amount, 0)} </Text>
                  </View>
                </View>
              </View>

              <View style={{ marginTop: "2" }}>
                <View style={[{ flexDirection: "row", padding: "1", borderWidth: "1", fontWeight: "bold", justifyContent: "space-between", fontSize: "11" }]}>
                  <View style={[{}]}>
                    <Text style={[{ padding: "3", paddingHorizontal: "1" }]}> Total Amount payable after due date  </Text>
                  </View>
                  <View style={[{ width: 50, alignSelf: "flex-end", borderLeftWidth: "1", paddingHorizontal: "2" }]}>
                    <Text style={[{ padding: "3", paddingHorizontal: "1" }]}> {item?.fee?.reduce((sum, i) => sum + i.amount, 0) + 100} </Text>
                  </View>
                </View>
              </View>

            </View>
          </Page>
        })
      }

    </Document>
  )
}

export default FeeSlipInvoice