"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
} from "@/components/ui/select";
import { SelectTrigger } from "@radix-ui/react-select";
import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";

const SalaryCalculator = () => {
  const [count, setCount] = useState(0);
  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };


  function calculateNetSalaryVietnam(grossSalaryOrther: any, grossSalary: any, taxBrackets: any, personalDeduction: any, dependentDeduction: any) {
    let socialInsurance, healthInsurance, unemploymentInsurance
    if (grossSalaryOrther > 0) {
      socialInsurance = grossSalaryOrther * 0.08;
      if (socialInsurance > 3744000) {
        socialInsurance = 3744000
      }
      healthInsurance = grossSalaryOrther * 0.015;
      if (healthInsurance > 702000) {
        healthInsurance = 702000;
      }
      unemploymentInsurance = grossSalaryOrther * 0.01;
      if (unemploymentInsurance > 992000) {
        unemploymentInsurance = 992000;
      }
    } else {
      socialInsurance = grossSalary * 0.08;
      if (socialInsurance > 3744000) {
        socialInsurance = 3744000
      }
      healthInsurance = grossSalary * 0.015;
      if (healthInsurance > 702000) {
        healthInsurance = 702000;
      }
      unemploymentInsurance = grossSalary * 0.01;
      if (unemploymentInsurance > 992000) {
        unemploymentInsurance = 992000;
      }
    }
    const preTaxIncome = grossSalary - socialInsurance - healthInsurance - unemploymentInsurance;
    let taxableIncome = preTaxIncome - personalDeduction - dependentDeduction;

    taxableIncome = Math.max(0, taxableIncome);
    console.log(taxableIncome, "taxAbleCOme")

    let incomeTax = 0;
    for (const bracket of taxBrackets) {
      if (taxableIncome <= 0) break;
      const taxableAmountInBracket = Math.min(taxableIncome, bracket.upperLimit - bracket.lowerLimit);
      console.log(taxableAmountInBracket, "taxableAmountInBracket")
      incomeTax += taxableAmountInBracket * bracket.rate;
      taxableIncome -= taxableAmountInBracket;
    }
    console.log(incomeTax, "incomeTax")
    const netSalary = preTaxIncome - incomeTax;


    return {
      grossSalary: formatVND(grossSalary),
      socialInsurance: formatVND(socialInsurance),
      healthInsurance: formatVND(healthInsurance),
      unemploymentInsurance: (unemploymentInsurance),
      preTaxIncome: formatVND(preTaxIncome),
      taxableIncome: formatVND(taxableIncome),
      incomeTax: formatVND(incomeTax),
      netSalary: formatVND(netSalary)
    };
  }
  function calculateGrossSalaryVietnam(netSalary: any, taxBrackets: any, personalDeduction: any, dependentDeduction: any) {
    let grossSalary = netSalary * 1.407;
    console.log(grossSalary)

    let iterations = 0;
    let tolerance = 1;

    

      let socialInsurance, healthInsurance, unemploymentInsurance;
      socialInsurance = grossSalary * 0.08;
      if (socialInsurance > 3744000) {
        socialInsurance = 3744000
      }
      healthInsurance = grossSalary * 0.015;
      if (healthInsurance > 702000) {
        healthInsurance = 702000;
      }
      unemploymentInsurance = grossSalary * 0.01;
      if (unemploymentInsurance > 992000) {
        unemploymentInsurance = 992000;
      }


      let preTaxIncome = grossSalary - socialInsurance - healthInsurance - unemploymentInsurance;
      console.log(grossSalary,preTaxIncome)
      let taxableIncome = preTaxIncome - personalDeduction - dependentDeduction;
      taxableIncome = Math.max(0, taxableIncome);
      console.log(taxableIncome)

      let incomeTax = 0;
      for (const bracket of taxBrackets) {
        if (taxableIncome <= 0) break;
        const taxableAmountInBracket = Math.min(taxableIncome, bracket.upperLimit - bracket.lowerLimit);
        incomeTax += taxableAmountInBracket * bracket.rate;
        taxableIncome -= taxableAmountInBracket;
      }

      const calculatedNetSalary = preTaxIncome - incomeTax;
      tolerance = Math.abs(calculatedNetSalary - netSalary);

      grossSalary += (netSalary - calculatedNetSalary) * 1.1;
      iterations++;
    

    if (iterations >= 100) {
      console.warn("Net to Gross calculation did not converge within 100 iterations. Result may be inaccurate.");
    }

     socialInsurance = grossSalary * 0.08;
     healthInsurance = grossSalary * 0.015;
     unemploymentInsurance = grossSalary * 0.01;
     preTaxIncome = grossSalary - socialInsurance - healthInsurance - unemploymentInsurance;
     taxableIncome = preTaxIncome - personalDeduction - dependentDeduction;
     incomeTax = calculateIncomeTax(taxableIncome, taxBrackets); // Helper function (see below)
    const netSalaryCalculated = preTaxIncome - incomeTax;
    console.log(preTaxIncome)


    return {
      netSalary: (netSalaryCalculated),
      grossSalary: (grossSalary),
      socialInsurance: (socialInsurance),
      healthInsurance: (healthInsurance),
      unemploymentInsurance: (unemploymentInsurance),
      preTaxIncome: (preTaxIncome),
      taxableIncome: (taxableIncome),
      incomeTax: (incomeTax),
    };
  }
  function calculateIncomeTax(taxableIncome: any, taxBrackets: any) {
    let incomeTax = 0;
    for (const bracket of taxBrackets) {
      if (taxableIncome <= 0) break;
      const taxableAmountInBracket = Math.min(taxableIncome, bracket.upperLimit - bracket.lowerLimit);
      incomeTax += taxableAmountInBracket * bracket.rate;
      taxableIncome -= taxableAmountInBracket;
    }
    return incomeTax;
  }

  const taxBrackets = [
    { lowerLimit: 0, upperLimit: 5000000, rate: 0.05 },
    { lowerLimit: 5000000, upperLimit: 10000000, rate: 0.1 },
    { lowerLimit: 10000000, upperLimit: 18000000, rate: 0.15 },
    { lowerLimit: 18000000, upperLimit: 32000000, rate: 0.2 },
    { lowerLimit: 32000000, upperLimit: 52000000, rate: 0.25 },
    { lowerLimit: 52000000, upperLimit: 80000000, rate: 0.3 },
    { lowerLimit: 80000000, upperLimit: Infinity, rate: 0.35 }

  ];

  const [grossSalary, setGrossSalary] = useState(0);
  const [grossSalaryOrther, setGrossSalaryOrther] = useState(0);
  const [netSalary, setNetSalary] = useState(0)
  const personalDeduction = 11000000;
  const dependentDeduction = 4400000


  const grossSalaryChange = (e: any) => {
    setGrossSalary(e.target.value)
  }
  const grossSalaryOrtherChange = (e: any) => {
    setGrossSalaryOrther(e.target.value)
  }
  let [salaryBreakdown, setSalaryBreakdown] = useState({
    grossSalary: 0,
    socialInsurance: 0,
    healthInsurance: 0,
    unemploymentInsurance: 0,
    preTaxIncome: 0,
    taxableIncome: 0,
    incomeTax: 0,
    netSalary: 0
  })
  const grossSalaryToGross = () => {
    const grossSalaryInfo = calculateGrossSalaryVietnam(Number(grossSalary), taxBrackets, personalDeduction, dependentDeduction);
    console.log(Number(grossSalaryInfo.grossSalary))
    // salaryBreakdown = calculateNetSalaryVietnam(grossSalaryOrther, Number(grossSalaryInfo.grossSalary), taxBrackets, personalDeduction, dependentDeduction * count);
    // setSalaryBreakdown(salaryBreakdown)
  }
  const grossSalaryToNet = () => {
    salaryBreakdown = calculateNetSalaryVietnam(grossSalaryOrther, grossSalary, taxBrackets, personalDeduction, dependentDeduction * count);
    setSalaryBreakdown(salaryBreakdown)
    const salaryDataCal = calculateSalaryDeductions(grossSalary)
    setSalaryData(salaryDataCal)
    setNetSalary(salaryBreakdown.netSalary)
  }
  const [insuranceBasis, setInsuranceBasis] = useState('salary');
  const handleInsuranceBasisChange = (value: any) => {
    if (value === "salary") {
      setGrossSalaryOrther(0)
    }
    setInsuranceBasis(value);
  };
  function formatVND(amount: any) {
    return amount.toLocaleString('it-IT');
  }
  const [salaryData, setSalaryData] = useState<any>({
    grossSalary: 0,
    socialInsurance: 0,
    laborAccidentInsurance: 0,
    healthInsurance: 0,
    unemploymentInsurance: 0,
    totalDeductions: 0,
    netSalary: 0
  })
  function calculateSalaryDeductions(grossSalary: any) {
    if (grossSalary <= 0) {
      return null;
    }

    let socialInsurance = grossSalary * 0.17;
    if (socialInsurance > 7956000) {
      socialInsurance = 7956000
    }
    let laborAccidentInsurance = grossSalary * 0.005;
    if (laborAccidentInsurance > 234000) {
      laborAccidentInsurance = 234000
    }
    let healthInsurance = grossSalary * 0.03;
    if (healthInsurance > 1404000) {
      healthInsurance = 1404000
    }
    let unemploymentInsurance = grossSalary * 0.01;
    if (unemploymentInsurance > 992000) {
      unemploymentInsurance = 992000
    }
    const totalDeductions = Number(grossSalary) + socialInsurance + laborAccidentInsurance + healthInsurance + unemploymentInsurance;
    const netSalary = grossSalary - totalDeductions;

    return {
      grossSalary,
      socialInsurance,
      laborAccidentInsurance,
      healthInsurance,
      unemploymentInsurance,
      totalDeductions,
      netSalary,
    };
  }

  return (
    <>
      <div className="bg-[#F7F8FA] py-4">
        <div className="container">
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 rounded-md bg-white p-6">
              <p className="my-3 text-lg font-bold">
                Công cụ tính lương Gross sang Net và ngược lại [Chuẩn 2024]
              </p>
              <div className="my-4">
                <p>Thu nhập</p>
                <div className="my-2 flex justify-between gap-4">
                  <input
                    onChange={(e) => grossSalaryChange(e)}
                    type="number"
                    name=""
                    id=""
                    className="h-10 flex-1 rounded-md border border-solid border-[#d9d9d9] px-2 py-3 transition-all hover:border-[#80adff] focus-visible:outline-none"
                  />
                  <div className="flex gap-2 rounded-sm border border-solid p-1">
                    <button className="flex-1 rounded-sm border border-solid border-[#b3ceff] bg-[#e6efff] px-3 py-1 text-[#005aff] transition-all hover:border-[#ccdeff] hover:bg-[#ccdeff]">
                      VND
                    </button>
                  </div>
                </div>
              </div>
              <div className="my-4">
                <p>Số người phụ thuộc</p>
                <div className="my-2 flex gap-2">
                  <button
                    className={`h-10 rounded-md border border-solid p-3 ${count === 0 ? "bg-[#f6f8fb]" : ""
                      }`}
                    onClick={handleDecrement}
                  >
                    <FaMinus color="grey" />
                  </button>
                  <div className="flex h-10 w-20 items-center justify-center rounded-md border border-solid p-3">
                    <span>{count}</span>
                  </div>
                  <button
                    className="h-10 rounded-md border border-solid p-3"
                    onClick={handleIncrement}
                  >
                    <FaPlus color="grey" />
                  </button>
                </div>
              </div>

              <div className="my-4">
                <div className="flex gap-3">
                  <div className="flex-1">
                    <p>Đóng bảo hiểm dựa trên</p>
                    <div className="my-2 flex w-full gap-2">
                      <Select onValueChange={handleInsuranceBasisChange} value={insuranceBasis}>
                        <SelectTrigger className="flex-1 rounded-md border border-solid p-2 text-start outline-none">
                          <SelectValue placeholder="Lương chính thức" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="salary">
                              Lương chính thức
                            </SelectItem>
                            <SelectItem value="not">Khác</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex-1">
                    <p>Đóng bảo hiểm dựa trên</p>
                    <div className="my-2 flex w-full gap-2">
                      <input
                        type="number"
                        name=""
                        id=""
                        value={insuranceBasis === 'salary' ? grossSalary : grossSalaryOrther}
                        onChange={(e) => grossSalaryOrtherChange(e)}
                        disabled={insuranceBasis === 'salary'}
                        className={`h-10 flex-1 rounded-md border border-solid border-[#d9d9d9] px-2 py-3 transition-all hover:border-[#80adff] focus-visible:outline-none ${insuranceBasis === 'salary' ? 'bg-gray-200' : ''}`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="my-4">
                <div className="flex gap-3">
                  <div className="flex-1">
                    <p>Vùng</p>
                    <div className="my-2 flex w-full gap-2">
                      <Select>
                        <SelectTrigger className="flex-1 rounded-md border border-solid p-2 text-start outline-none">
                          <SelectValue placeholder="Vùng 1" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="1">Vùng 1</SelectItem>
                            <SelectItem value="2">Vùng 2</SelectItem>
                            <SelectItem value="3">Vùng 3</SelectItem>
                            <SelectItem value="4">Vùng 4</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="my-4">
                <div className="flex w-full gap-1 mb-4 rounded-sm border border-solid p-1">
                  <button
                    onClick={grossSalaryToNet}
                    className="flex-1 rounded-sm border border-solid border-[#b3ceff] bg-[#e6efff] px-3 py-1 text-[#005aff] transition-all hover:border-[#ccdeff] hover:bg-[#ccdeff]">
                    Gross -{">"} Net
                  </button>
                  <button
                    onClick={grossSalaryToGross}
                    className="flex-1 rounded-sm border border-solid border-[#b3ceff] bg-[#e6efff] px-3 py-1 text-[#005aff] transition-all hover:border-[#ccdeff] hover:bg-[#ccdeff]">
                    Net -{">"} Gross
                  </button>
                </div>
                <div className="rounded-md bg-[#e6efff] p-4">
                  <div className="flex justify-between">
                    <p className="text-sm">
                      Kết quả tính lương{" "}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-md bg-[#f7faff] p-4 text-sm">
                      <p className="font-bold">GROSS</p>
                      <p>{formatVND(Number(grossSalary)) || 0} VND</p>
                    </div>
                    <span> -{">"} </span>
                    <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-md bg-[#f7faff] p-4 text-sm">
                      <p className="font-bold">NET</p>
                      <p>{netSalary} VND</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-4">
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  <div className="bg-gray-100 p-4">
                    <span className="text-green-600 font-bold">Diễn giải chi tiết (VNĐ)</span>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between py-2">
                      <span className="font-bold">Lương GROSS</span>
                      <span>{formatVND(Number(salaryBreakdown.grossSalary))}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span>Bảo hiểm xã hội (8%)</span>
                      <span>- {salaryBreakdown.socialInsurance}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span>Bảo hiểm y tế (1.5%)</span>
                      <span>- {salaryBreakdown.healthInsurance}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span>Bảo hiểm thất nghiệp (1%)</span>
                      <span>- {salaryBreakdown.unemploymentInsurance}</span>
                    </div>
                    <div className="flex justify-between py-2 bg-gray-100">
                      <span className="font-bold">Thu nhập trước thuế</span>
                      <span>{salaryBreakdown.preTaxIncome}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span>Giảm trừ gia cảnh bản thân</span>
                      <span>- {formatVND(personalDeduction)}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span>Giảm trừ gia cảnh người phụ thuộc</span>
                      <span>- {formatVND(dependentDeduction * count)}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span>Thuế thu nhập cá nhân(*)</span>
                      <span>- {formatVND(salaryBreakdown.incomeTax)}</span>
                    </div>
                    <div className="flex justify-between py-2 bg-gray-100">
                      <span className="font-bold">Lương NET</span>
                      <span>{formatVND(salaryBreakdown.netSalary)}</span>
                    </div>
                    <span>(Thu nhập trước thuế - Thuế thu nhập cá nhân.)</span>

                  </div>
                </div>
              </div>
              <div className="my-4">
                <div className="border border-gray-300 rounded-lg p-4 bg-white">
                  <h2 className="text-green-600 font-bold">(*) Chi tiết thuế thu nhập cá nhân (VNĐ)</h2>
                  <table className="w-full mt-4 border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2 text-left">Mức chịu thuế</th>
                        <th className="border border-gray-300 p-2 text-left">Thuế suất</th>
                        <th className="border border-gray-300 p-2 text-left">Tiền nộp</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 p-2">Đến 5 triệu VNĐ</td>
                        <td className="border border-gray-300 p-2">5%</td>
                        <td className="border border-gray-300 p-2">250,000</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2">Trên 5 triệu VNĐ đến 10 triệu VNĐ</td>
                        <td className="border border-gray-300 p-2">10%</td>
                        <td className="border border-gray-300 p-2">500,000</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2">Trên 10 triệu VNĐ đến 18 triệu VNĐ</td>
                        <td className="border border-gray-300 p-2">15%</td>
                        <td className="border border-gray-300 p-2">1,200,000</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2">Trên 18 triệu VNĐ đến 32 triệu VNĐ</td>
                        <td className="border border-gray-300 p-2">20%</td>
                        <td className="border border-gray-300 p-2">2,330,800</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2">Trên 32 triệu VNĐ đến 52 triệu VNĐ</td>
                        <td className="border border-gray-300 p-2">25%</td>
                        <td className="border border-gray-300 p-2">0</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2">Trên 52 triệu VNĐ đến 80 triệu VNĐ</td>
                        <td className="border border-gray-300 p-2">30%</td>
                        <td className="border border-gray-300 p-2">0</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2">Trên 80 triệu VNĐ</td>
                        <td className="border border-gray-300 p-2">35%</td>
                        <td className="border border-gray-300 p-2">0</td>
                      </tr>
                    </tbody>
                  </table>
                  <h2 className="text-green-600 font-bold mt-4">Người sử dụng lao động trả (VNĐ)</h2>
                  <table className="w-full mt-4 border-collapse">
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 p-2">Lương GROSS</td>
                        <td className="border border-gray-300 p-2 text-right">{formatVND(Number(salaryData.grossSalary))}</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2">Bảo hiểm xã hội (17%)</td>
                        <td className="border border-gray-300 p-2 text-right">{formatVND(salaryData.socialInsurance)}</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2">Bảo hiểm Tai nạn lao động - Bệnh nghề nghiệp (0.5%)</td>
                        <td className="border border-gray-300 p-2 text-right">{formatVND(salaryData.laborAccidentInsurance)}</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2">Bảo hiểm y tế (3%)</td>
                        <td className="border border-gray-300 p-2 text-right">{formatVND(salaryData.healthInsurance)}</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2">Bảo hiểm thất nghiệp (1%)</td>
                        <td className="border border-gray-300 p-2 text-right">{formatVND(salaryData.unemploymentInsurance)}</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2 font-bold">Tổng cộng</td>
                        <td className="border border-gray-300 p-2 text-right font-bold">{formatVND(salaryData.totalDeductions)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                Theo Nghị định số 24/2023/NĐ-CP của Chính phủ hiệu lực từ ngày
                1/7/2023
              </p>
            </div>
            <div className="col-span-1 flex h-fit flex-col items-center rounded-md bg-white p-4">
              <div>
                <svg
                  width="121"
                  height="111"
                  viewBox="0 0 121 111"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.17689 51.2409L5.27388 51.829L3.9451 54.6779L2.84811 54.0898L4.17689 51.2409Z"
                    fill="white"
                  ></path>
                  <path
                    d="M3.69892 55.2071L2.60161 54.6188C2.31281 54.4619 2.18934 54.1012 2.32435 53.8091L3.65351 50.9594C3.78852 50.6673 4.13484 50.5553 4.42363 50.7123L5.52094 51.3005C5.80974 51.4575 5.93322 51.8182 5.79822 52.1102L4.46906 54.96C4.33405 55.2521 3.98771 55.364 3.69892 55.2071ZM3.61882 53.8391L3.66983 53.8684L4.45272 52.0509L3.61994 53.8428L3.61882 53.8391Z"
                    fill="#002976"
                  ></path>
                  <path
                    d="M40.0612 70.2281L41.1582 70.8162L39.8836 73.5514L38.7867 72.9634L40.0612 70.2281Z"
                    fill="white"
                  ></path>
                  <path
                    d="M39.6409 74.0801L38.5436 73.4918C38.2548 73.3349 38.1313 72.9742 38.2663 72.6821L39.5413 69.946C39.6763 69.6539 40.0226 69.542 40.3114 69.6989L41.4087 70.2872C41.6975 70.4441 41.821 70.8048 41.686 71.0969L40.411 73.833C40.276 74.1251 39.9297 74.237 39.6409 74.0801ZM39.5608 72.7121L39.6118 72.7414L40.3405 71.0376L39.5608 72.7121Z"
                    fill="#002976"
                  ></path>
                  <path
                    d="M15.1361 68.1247C5.37619 62.2437 0.268676 55.4591 3.75322 53.0022C7.23312 50.5427 18.0066 53.3276 27.7654 59.2049C37.5243 65.0822 42.6329 71.8705 39.1484 74.3274C35.6649 76.788 24.8961 74.0057 15.1361 68.1247Z"
                    fill="#002976"
                  ></path>
                  <path
                    d="M17.595 70.1924C16.6717 69.6981 15.7511 69.1745 14.8611 68.6378C7.33543 64.104 2.32267 58.89 2.08618 55.349C2.0048 54.1558 2.46511 53.1696 3.40829 52.5013C6.72057 50.161 15.927 52.1089 25.2958 57.1332C26.2191 57.6275 27.1397 58.151 28.0343 58.6905C35.5599 63.2242 40.5738 68.4419 40.8103 71.983C40.8917 73.1761 40.4314 74.1623 39.4882 74.8306C36.1748 77.1672 26.9684 75.2193 17.595 70.1924ZM24.804 58.1937C15.9386 53.4407 7.03003 51.4238 4.0884 53.5028C3.4651 53.9453 3.18678 54.5401 3.23769 55.3244C3.40954 57.8946 7.23843 62.6924 15.405 67.6103C16.2799 68.1353 17.182 68.6482 18.0867 69.1318C26.9568 73.8875 35.8618 75.9055 38.8035 73.8265C39.4267 73.3839 39.7051 72.7891 39.6542 72.0049C39.4823 69.4347 35.6534 64.6369 27.4869 59.719C26.6026 59.1886 25.7088 58.6774 24.804 58.1937Z"
                    fill="#002976"
                  ></path>
                  <path
                    d="M16.3039 65.6125C6.54504 59.7353 1.4364 52.9469 4.92094 50.49C8.40084 48.0305 19.1744 50.8154 28.9332 56.6927C38.692 62.57 43.8006 69.3583 40.3161 71.8152C36.8316 74.2721 26.0638 71.4935 16.3039 65.6125Z"
                    fill="white"
                  ></path>
                  <path
                    d="M18.7676 67.6781C17.8442 67.1838 16.9237 66.6602 16.0337 66.1235C8.50799 61.5897 3.49524 56.3757 3.25874 52.8347C3.17736 51.6415 3.63767 50.6553 4.58086 49.987C7.89313 47.6467 17.1006 49.5984 26.473 54.6215C27.3963 55.1159 28.3168 55.6394 29.2068 56.1762C36.7325 60.7099 41.7464 65.9276 41.9829 69.4687C42.0607 70.6629 41.604 71.648 40.6608 72.3163C37.3474 74.6529 28.141 72.705 18.7676 67.6781ZM25.9812 55.6821C17.1112 50.9264 8.20612 48.9084 5.26449 50.9875C4.6412 51.43 4.36285 52.0248 4.41376 52.809C4.58562 55.3793 8.4145 60.177 16.581 65.0949C17.456 65.62 18.3581 66.1328 19.2628 66.6165C28.1329 71.3722 37.0379 73.3902 39.9795 71.3111C40.6028 70.8686 40.8812 70.2738 40.8303 69.4896C40.6584 66.9193 36.8295 62.1216 28.6619 57.1999C27.7811 56.6685 26.8849 56.162 25.9801 55.6784L25.9812 55.6821Z"
                    fill="#002976"
                  ></path>
                  <path
                    d="M35.2786 43.6837C33.5227 37.3522 26.9067 33.6419 20.5011 35.3964C14.0956 37.1509 10.3262 43.7059 12.082 50.0373C13.8379 56.3688 20.454 60.0792 26.8595 58.3247C33.265 56.5702 37.0344 50.0152 35.2786 43.6837Z"
                    fill="white"
                  ></path>
                  <path
                    d="M26.9658 58.7384C20.3408 60.5546 13.4745 56.7026 11.6572 50.1528C9.84139 43.6015 13.7534 36.7958 20.3785 34.9795C27.0035 33.1633 33.8697 37.0153 35.6871 43.5651C37.5044 50.1149 33.5908 56.9221 26.9658 58.7384ZM20.6083 35.8081C14.4451 37.4986 10.8055 43.8311 12.4942 49.924C14.1843 56.0185 20.5742 59.6019 26.7374 57.9114C32.9006 56.2208 36.5402 49.8884 34.8515 43.7954C33.1628 37.7025 26.7715 34.1176 20.6083 35.8081Z"
                    fill="#002976"
                  ></path>
                  <path
                    d="M27.1617 44.0659L26.4235 41.4009C26.0637 40.1078 24.7125 39.351 23.403 39.7067L23.2738 39.743L22.66 37.5272L20.9888 37.9849L21.6026 40.2007C20.2945 40.561 19.5248 41.8987 19.8814 43.1947L20.1532 44.1766C20.4291 45.1692 21.1278 45.9851 22.0722 46.4109L25.826 48.1133C26.3041 48.3309 26.66 48.7444 26.7993 49.2467L27.1414 50.4806C27.2468 50.863 27.019 51.2568 26.6346 51.3626L24.7036 51.8912C24.3177 51.9955 23.9196 51.7731 23.8127 51.3921L23.004 48.4781L21.3328 48.9359L22.1414 51.8498C22.5012 53.143 23.8525 53.8997 25.162 53.544L25.2911 53.5078L25.9401 55.8511L27.6113 55.3933L26.9624 53.05L27.0915 53.0138C28.3997 52.6535 29.1679 51.3143 28.8127 50.0198L28.4706 48.786C28.1962 47.7949 27.4959 46.9804 26.5515 46.5516L22.7963 44.8477C22.3182 44.6301 21.9623 44.2166 21.8246 43.7128L21.5528 42.7309C21.4459 42.3499 21.6753 41.9547 22.0596 41.8489L23.86 41.355C24.2444 41.2492 24.644 41.4731 24.751 41.8541L25.4891 44.5191L27.1619 44.0599L27.1617 44.0659Z"
                    fill="white"
                  ></path>
                  <path
                    d="M27.7278 55.806L26.0566 56.2637C25.8257 56.3281 25.5875 56.1923 25.5238 55.9661L24.9843 54.0219C23.5233 54.2628 22.119 53.3749 21.7252 51.9649L20.9166 49.0509C20.853 48.8217 20.99 48.5858 21.2194 48.5229L22.8906 48.0651C23.1216 48.0007 23.3598 48.1366 23.4234 48.3628L24.2321 51.2767C24.2739 51.43 24.4352 51.5211 24.5902 51.4783L26.5212 50.9496C26.6761 50.9067 26.767 50.7489 26.7251 50.5956L26.383 49.3618C26.2761 48.9808 26.0088 48.668 25.6466 48.5025L21.8928 46.8001C20.8341 46.3208 20.0438 45.4011 19.7371 44.2887L19.4653 43.3067C19.0897 41.9439 19.7751 40.5102 21.0811 39.9304L20.5742 38.0985C20.5106 37.8694 20.6476 37.6334 20.877 37.5705L22.5482 37.1128C22.7792 37.0484 23.0174 37.1842 23.081 37.4104L23.584 39.2255C25.045 38.9847 26.4493 39.8725 26.843 41.2826L27.5812 43.9476C27.6447 44.1768 27.5078 44.4127 27.2784 44.4756L25.6072 44.9334C25.3762 44.9978 25.138 44.8619 25.0744 44.6357L24.3362 41.9707C24.2943 41.8175 24.1345 41.7279 23.9781 41.7692L22.1777 42.2632C22.0227 42.3061 21.9319 42.4639 21.9737 42.6171L22.2455 43.5991C22.3524 43.98 22.6197 44.2928 22.9819 44.4584L26.7357 46.1607C27.7944 46.64 28.5832 47.5582 28.89 48.6706L29.2321 49.9045C29.6213 51.3159 28.8712 52.7955 27.4927 53.3323L28.0322 55.2765C28.0958 55.5057 27.9588 55.7416 27.7278 55.806ZM26.246 55.3229L27.0816 55.0925L26.5476 53.1636C26.4841 52.9344 26.6211 52.6985 26.8505 52.6356L26.9796 52.5993C28.0568 52.3034 28.6911 51.2003 28.398 50.1334L28.0559 48.8995C27.8152 48.0314 27.2008 47.3146 26.3737 46.9393L22.6185 45.2354C22.0246 44.9658 21.5815 44.4502 21.4084 43.8249L21.1367 42.843C20.9677 42.2344 21.3326 41.6017 21.9464 41.433L23.7467 40.939C24.3635 40.7704 24.9999 41.1286 25.1689 41.7372L25.7936 43.9895L26.6293 43.7591L26.0046 41.5069C25.7069 40.4414 24.5939 39.8174 23.5169 40.1103L23.3877 40.1466C23.1567 40.2109 22.9185 40.0751 22.8549 39.8489L22.356 38.0475L21.5204 38.2778L22.0192 40.0793C22.0828 40.3085 21.9458 40.5444 21.7164 40.6073C20.6392 40.9032 20.0034 42.0079 20.2981 43.0732L20.5698 44.0552C20.8105 44.9233 21.4264 45.6417 22.252 46.0154L26.0072 47.7193C26.6026 47.9905 27.0442 48.5045 27.2172 49.1298L27.5593 50.3637C27.7284 50.9723 27.3635 51.605 26.7497 51.7737L24.8187 52.3024C24.2019 52.471 23.5656 52.1127 23.3965 51.5041L22.7044 49.003L21.8687 49.2334L22.5609 51.7345C22.8586 52.8 23.9715 53.4239 25.0486 53.131L25.1777 53.0948C25.4087 53.0304 25.6469 53.1663 25.7105 53.3924L26.2445 55.3214L26.246 55.3229Z"
                    fill="#002976"
                  ></path>
                  <path
                    d="M27.0806 59.152C20.2262 61.0312 13.1186 57.0465 11.2408 50.2676C9.36152 43.4903 13.4108 36.4456 20.2652 34.5663C27.1197 32.687 34.2272 36.6718 36.105 43.4506C37.9843 50.228 33.9351 57.2727 27.0806 59.152ZM20.7235 36.2219C14.7911 37.8482 11.2854 43.9446 12.9134 49.8115C14.5398 55.6798 20.6914 59.1272 26.6237 57.5009C32.556 55.8747 36.0618 49.7782 34.4338 43.9114C32.8074 38.0431 26.6558 34.5957 20.7235 36.2219Z"
                    fill="white"
                  ></path>
                  <path
                    d="M27.1944 59.5642C20.109 61.5078 12.7648 57.3887 10.8219 50.3822C8.87907 43.3757 13.0637 36.0965 20.1506 34.1544C27.2374 32.2123 34.5802 36.3298 36.523 43.3364C38.4659 50.3429 34.2812 57.6221 27.1944 59.5642ZM20.3805 34.98C13.7555 36.7963 9.8433 43.6022 11.659 50.1534C13.4746 56.7046 20.341 60.5535 26.9675 58.7387C33.594 56.9239 37.5047 50.1165 35.689 43.5653C33.8733 37.014 27.007 33.1652 20.3805 34.98ZM26.7376 57.9101C20.5744 59.6007 14.1846 56.0175 12.4945 49.923C10.8045 43.8285 14.4457 37.4946 20.6089 35.807C26.7722 34.1164 33.1619 37.6996 34.852 43.7941C36.542 49.8886 32.9008 56.2225 26.7376 57.9101ZM20.8389 36.6326C15.1359 38.1959 11.7672 44.0565 13.3316 49.6942C14.896 55.332 20.8078 58.648 26.5091 57.0861C32.2105 55.5242 35.5808 49.6622 34.0164 44.0244C32.452 38.3867 26.5402 35.0707 20.8389 36.6326Z"
                    fill="#002976"
                  ></path>
                  <path
                    d="M85.6214 7.96285L48.9509 7.53174L59.6673 43.3332L74.1007 43.5035L85.6216 7.96423L85.6214 7.96285Z"
                    fill="white"
                  ></path>
                  <path
                    d="M74.0973 43.8809L59.664 43.7106C59.5001 43.7081 59.3574 43.6008 59.3104 43.4454L48.5941 7.64393C48.5352 7.44656 48.6471 7.24086 48.8442 7.18203C48.8806 7.171 48.9178 7.16548 48.9545 7.1657L85.625 7.59682C85.831 7.59877 85.9955 7.76778 85.9935 7.97275C85.9933 8.00948 85.9876 8.04702 85.9759 8.08262L74.455 43.6218C74.4047 43.7775 74.2594 43.8809 74.0958 43.8797L74.0973 43.8809ZM59.9463 42.9715L73.8319 43.1354L85.1129 8.33603L49.4531 7.91614L59.9463 42.9715Z"
                    fill="#002976"
                  ></path>
                  <path
                    d="M78.1768 7.88306L56.397 7.62646L62.5948 41.8642L71.2091 41.966L78.1768 7.88306Z"
                    fill="white"
                  ></path>
                  <path
                    d="M71.2047 42.3325L62.589 42.2308C62.4112 42.229 62.2583 42.1006 62.2268 41.926L56.0305 7.68946C55.9948 7.48586 56.1298 7.29367 56.333 7.25792C56.3551 7.25465 56.3785 7.25118 56.4012 7.25206L78.1811 7.50867C78.3874 7.512 78.5521 7.68236 78.5487 7.88753C78.5478 7.91024 78.5456 7.93316 78.5417 7.95489L71.5754 42.0377C71.5393 42.2124 71.3844 42.3369 71.2063 42.3337L71.2047 42.3325ZM62.9051 41.491L70.9052 41.585L77.7207 8.24447L56.8431 7.99961L62.9037 41.4912L62.9051 41.491Z"
                    fill="#002976"
                  ></path>
                  <path
                    d="M70.4256 26.5789L63.7242 26.5C43.9856 26.2672 27.804 42.05 27.5817 61.7504L27.3056 86.2733C27.2499 91.1977 31.205 95.2373 36.1404 95.2954L96.4514 96.0054C101.385 96.0638 105.432 92.1179 105.488 87.1935L105.764 62.6706C105.986 42.9702 90.1642 26.8117 70.4258 26.5803L70.4256 26.5789Z"
                    fill="white"
                  ></path>
                  <path
                    d="M96.4465 96.378L36.1355 95.668C31.0026 95.6081 26.8748 91.3922 26.9335 86.2697L27.2097 61.7468C27.433 41.8727 43.8154 25.895 63.7277 26.1303L70.4291 26.2092C90.3412 26.4432 106.359 42.8027 106.135 62.6754L105.859 87.1983C105.802 92.3206 101.579 96.4379 96.4479 96.3778L96.4465 96.378ZM63.7193 26.8726C44.2179 26.6427 28.173 42.2924 27.9536 61.7552L27.6775 86.2781C27.6242 90.9904 31.4231 94.8698 36.1437 94.9244L96.4548 95.6344C101.176 95.6904 105.061 91.9011 105.114 87.1888L105.39 62.6659C105.609 43.203 89.9219 27.1799 70.4207 26.9515L63.7193 26.8726Z"
                    fill="#002976"
                  ></path>
                  <path
                    d="M81.2073 28.1887L52.9126 27.8566C52.0896 27.8473 51.4304 27.1742 51.4398 26.3528C51.4492 25.5313 52.1228 24.874 52.9457 24.8834L81.2405 25.2154C82.0635 25.2248 82.7226 25.8979 82.7132 26.7193C82.7038 27.5408 82.0303 28.1981 81.2073 28.1887Z"
                    fill="#002976"
                  ></path>
                  <path
                    d="M81.2015 28.5679L52.9068 28.2358C51.8805 28.2241 51.0553 27.3808 51.0669 26.3558C51.0786 25.3308 51.9235 24.5084 52.9498 24.5201L81.2446 24.8521C82.2708 24.8639 83.0961 25.7071 83.0844 26.7322C83.0727 27.7572 82.2278 28.5796 81.2015 28.5679ZM52.9414 25.2624C52.3258 25.2548 51.8184 25.7491 51.8122 26.364C51.806 26.9789 52.3009 27.4843 52.9164 27.492L81.2112 27.824C81.8267 27.8316 82.3341 27.3373 82.3403 26.7224C82.3465 26.1075 81.8517 25.6021 81.2361 25.5944L52.9414 25.2624Z"
                    fill="#002976"
                  ></path>
                  <path
                    d="M73.0911 57.7254L73.1509 52.4772C73.1756 50.0077 71.1929 47.9823 68.7179 47.9508L68.3239 47.9456L68.3742 43.4412L65.3955 43.4067L65.3453 47.9111L65.2014 47.9098C62.7271 47.8838 60.6989 49.861 60.6673 52.3315L60.6449 54.2643C60.6216 56.1719 61.4453 57.9935 62.8951 59.2382L68.79 64.3103C69.5732 64.9834 70.0175 65.9663 70.0053 66.9971L69.9779 69.4289C69.9667 70.2576 69.2871 70.9215 68.4559 70.9133L64.6909 70.8696C63.8606 70.8585 63.195 70.1793 63.2031 69.3496L63.2674 63.6081L60.2888 63.5735L60.2245 69.315C60.1999 71.7845 62.1825 73.81 64.6575 73.8415L65.0515 73.8466L64.9987 78.5998L67.9773 78.6344L68.0301 73.8812L68.4227 73.8866C70.897 73.9125 72.9252 71.9353 72.9567 69.4648L72.9841 67.033C73.0074 65.1255 72.1838 63.3039 70.734 62.0591L64.839 56.987C64.0559 56.3139 63.6114 55.3297 63.6236 54.2989L63.646 52.3661C63.6557 51.5375 64.3379 50.8719 65.168 50.8816L68.6831 50.9228C69.5132 50.9326 70.1807 51.6143 70.1709 52.4429L70.111 57.6911L73.0897 57.7257L73.0911 57.7254Z"
                    fill="white"
                  ></path>
                  <path
                    d="M75.476 54.8368L75.5541 47.5095C75.5879 43.953 72.7036 41.0338 69.1083 40.9776L68.7528 40.975L68.8176 34.8827L64.2265 34.8207L64.1618 40.9129C60.5666 40.8693 57.6244 43.7096 57.5806 47.2712L57.5512 49.9707C57.5246 52.7005 58.7041 55.291 60.7959 57.0688L69.1025 64.1602C70.1599 65.0654 70.7624 66.3795 70.748 67.7607L70.7126 71.1534C70.7001 72.2045 69.8309 73.0396 68.7745 73.0266L63.4699 72.9543C62.411 72.9363 61.5608 72.0776 61.5683 71.029L61.6498 63.0162L57.0588 62.9541L56.9772 70.967C56.9434 74.5235 59.8277 77.4427 63.423 77.4989L63.7785 77.5015L63.7095 83.9441L68.3006 84.0062L68.3696 77.5636L68.725 77.5662C72.3202 77.6098 75.2598 74.7645 75.3062 71.2079L75.3415 67.8152C75.3707 65.0905 74.1862 62.5025 72.0968 60.7172L63.7877 53.6207C62.7303 52.7155 62.1277 51.4015 62.1472 50.0176L62.1766 47.3181C62.1841 46.2696 63.0584 45.4319 64.1147 45.4449L69.0613 45.5096C70.1176 45.5226 70.9704 46.3863 70.9629 47.4348L70.8848 54.7621L75.4809 54.8217L75.476 54.8368Z"
                    fill="white"
                  ></path>
                  <path
                    d="M68.2933 85.154L63.7022 85.0919C63.0669 85.0861 62.5602 84.5653 62.5643 83.9428L62.6187 78.5967C58.722 78.1367 55.7989 74.8448 55.8321 70.9657L55.9136 62.9529C55.9202 62.3227 56.4422 61.8227 57.0725 61.831L61.6636 61.893C62.2989 61.8988 62.8055 62.4196 62.8014 63.0421L62.7199 71.055C62.7139 71.476 63.0576 71.8265 63.4836 71.8311L68.7882 71.9035C69.2142 71.9081 69.5614 71.5731 69.5674 71.1521L69.6028 67.7595C69.6103 66.7109 69.1596 65.7184 68.3589 65.0308L60.0524 57.9394C57.709 55.9415 56.3725 53.0194 56.4085 49.962L56.438 47.2624C56.4825 43.5168 59.2806 40.37 63.0317 39.8531L63.0865 34.817C63.093 34.1868 63.615 33.6868 64.2453 33.6951L68.8364 33.7571C69.4717 33.7629 69.9783 34.2837 69.9742 34.9063L69.9215 39.897C73.8181 40.3569 76.7413 43.6488 76.7081 47.5279L76.63 54.8552C76.6235 55.4854 76.1014 55.9854 75.4712 55.9771L70.8801 55.9151C70.2448 55.9093 69.7381 55.3885 69.7422 54.7659L69.8203 47.4386C69.8263 47.0177 69.4852 46.6722 69.0566 46.6625L64.1101 46.5978C63.684 46.5932 63.3368 46.9282 63.3308 47.3492L63.3014 50.0487C63.2938 51.0972 63.7445 52.0897 64.5452 52.7774L72.8517 59.8687C75.1952 61.8666 76.5291 64.7837 76.493 67.8412L76.4577 71.2338C76.4119 75.113 73.4154 78.3292 69.5115 78.6834L69.4571 84.0295C69.4506 84.6597 68.9286 85.1597 68.2933 85.154ZM64.8753 82.8358L67.1721 82.863L67.2293 77.5597C67.2359 76.9296 67.7579 76.4295 68.3882 76.4378L68.7437 76.4404C71.7035 76.4783 74.1287 74.1355 74.1659 71.204L74.2013 67.8114C74.2262 65.4244 73.1883 63.148 71.3583 61.5852L63.0492 54.4888C61.7351 53.3661 60.9858 51.7279 61.0045 50.0089L61.0339 47.3093C61.0506 45.6357 62.4442 44.2929 64.1309 44.3142L69.0774 44.3789C70.7716 44.4027 72.1285 45.7822 72.1119 47.4558L72.0481 53.6488L74.3448 53.6761L74.4087 47.4831C74.4333 44.5517 72.0582 42.1458 69.1008 42.1003L68.7454 42.0977C68.11 42.0919 67.6034 41.5711 67.6075 40.9486L67.6605 35.9956L65.3638 35.9684L65.3107 40.9213C65.3042 41.5515 64.7821 42.0515 64.1519 42.0432C61.192 42.0054 58.7619 44.3507 58.7296 47.2796L58.7001 49.9791C58.6753 52.3661 59.7157 54.6476 61.5432 56.2053L69.8522 63.3017C71.1689 64.4295 71.9157 66.0626 71.897 67.7817L71.8616 71.1743C71.845 72.848 70.4513 74.1908 68.7646 74.1695L63.4601 74.0971C61.7658 74.0734 60.4089 72.6938 60.4256 71.0202L60.5005 64.1441L58.2037 64.1168L58.1288 70.993C58.1042 73.9243 60.4793 76.3303 63.4367 76.3757L63.7921 76.3783C64.4275 76.3841 64.9341 76.9049 64.93 77.5275L64.8728 82.8307L64.8753 82.8358Z"
                    fill="#002976"
                  ></path>
                  <path
                    d="M22.8905 88.3201C29.8377 91.9797 38.4023 89.4145 42.02 82.5908C45.6378 75.767 42.9387 67.2686 35.9914 63.6091C29.0442 59.9495 20.4796 62.5147 16.8619 69.3384C13.2441 76.1622 15.9432 84.6606 22.8905 88.3201Z"
                    fill="white"
                  ></path>
                  <path
                    d="M22.6567 88.7628C15.4691 84.9773 12.6635 76.1548 16.4041 69.0993C20.1447 62.0437 29.0383 59.3827 36.226 63.1681C43.4136 66.9536 46.2192 75.7761 42.4786 82.8316C38.738 89.8872 29.8462 92.5506 22.6567 88.7628ZM35.757 64.0564C29.0679 60.5319 20.7957 63.0091 17.312 69.5748C13.8283 76.1405 16.439 84.3482 23.1281 87.8727C29.8172 91.3971 38.0894 88.92 41.5731 82.3543C45.0568 75.7886 42.4461 67.5808 35.757 64.0564Z"
                    fill="#002976"
                  ></path>
                  <path
                    d="M23.0209 89.5298C15.5821 85.6119 12.6812 76.4849 16.5511 69.1823C20.4209 61.8797 29.6244 59.1273 37.0657 63.0433C44.5069 66.9593 47.4053 76.0882 43.5354 83.3908C39.6632 90.6952 30.4621 93.4458 23.0209 89.5298ZM36.1228 64.8235C29.6848 61.4324 21.7199 63.8164 18.3663 70.1375C15.0128 76.4585 17.5257 84.3585 23.9638 87.7496C30.4018 91.1407 38.3667 88.7567 41.7202 82.4356C45.0737 76.1146 42.5608 68.2146 36.1228 64.8235Z"
                    fill="white"
                  ></path>
                  <path
                    d="M22.7884 89.9738C15.1005 85.9254 12.1005 76.4884 16.1009 68.9411C20.1037 61.3918 29.6148 58.5459 37.3027 62.5943C44.9906 66.6427 47.9906 76.0796 43.9902 83.627C39.9874 91.1762 30.4763 94.0222 22.7884 89.9738ZM36.8331 63.4868C29.6437 59.6994 20.7517 62.3633 17.0106 69.4189C13.2696 76.4746 16.0723 85.2987 23.2623 89.0818C30.4522 92.865 39.3437 90.2054 43.0847 83.1497C46.8258 76.094 44.0231 67.27 36.8331 63.4868ZM23.7313 88.1936C17.0423 84.6695 14.4338 76.4644 17.9161 69.8962C21.3984 63.328 29.6727 60.8529 36.3617 64.3769C43.0507 67.901 45.6591 76.106 42.1768 82.6742C38.6946 89.2424 30.4203 91.7176 23.7313 88.1936ZM35.886 65.2665C29.6973 62.0058 22.0421 64.2989 18.8216 70.3735C15.6011 76.4482 18.0141 84.0428 24.2027 87.3034C30.3913 90.5641 38.0466 88.271 41.2671 82.1964C44.4876 76.1217 42.0746 68.5271 35.886 65.2665Z"
                    fill="#002976"
                  ></path>
                  <path
                    d="M22.4164 89.2077C14.9776 85.2898 12.0768 76.1628 15.9467 68.8602C19.8189 61.5558 29.02 58.8052 36.4612 62.7212C43.9001 66.6391 46.8009 75.7661 42.931 83.0687C39.0588 90.3732 29.8577 93.1237 22.4164 89.2077ZM35.5183 64.5014C29.0803 61.1103 21.1154 63.4944 17.7619 69.8154C14.4084 76.1364 16.9213 84.0364 23.3593 87.4275C29.7974 90.8186 37.7623 88.4346 41.1158 82.1136C44.4693 75.7926 41.9564 67.8926 35.5183 64.5014Z"
                    fill="white"
                  ></path>
                  <path
                    d="M22.1795 89.6545C14.4916 85.6061 11.4916 76.1691 15.492 68.6217C19.4948 61.0725 29.0059 58.2266 36.6938 62.2749C44.3817 66.3233 47.3817 75.7603 43.3813 83.3077C39.3809 90.8551 29.8674 93.7028 22.1795 89.6545ZM36.2242 63.1675C29.0367 59.3825 20.1428 62.0439 16.4017 69.0996C12.6607 76.1553 15.4634 84.9793 22.6534 88.7625C29.8409 92.5475 38.7348 89.886 42.4758 82.8304C46.2169 75.7747 43.4142 66.9506 36.2242 63.1675ZM23.1224 87.8742C16.4334 84.3502 13.8249 76.1451 17.3072 69.5769C20.7895 63.0087 29.0638 60.5335 35.7528 64.0576C42.4418 67.5816 45.0502 75.7867 41.5679 82.3549C38.0857 88.9231 29.8114 91.3983 23.1224 87.8742ZM35.2771 64.9471C29.0903 61.6889 21.4332 63.9796 18.2127 70.0542C14.9922 76.1288 17.4052 83.7234 23.5938 86.9841C29.7806 90.2424 37.4377 87.9517 40.6582 81.877C43.8787 75.8024 41.4657 68.2078 35.2771 64.9471Z"
                    fill="#002976"
                  ></path>
                  <path
                    d="M26.596 71.4257L32.8404 74.7133L31.8973 76.4938L25.6529 73.2061L26.596 71.4257Z"
                    fill="#002976"
                  ></path>
                  <path
                    d="M31.6595 76.937L25.4152 73.6494C25.1641 73.5165 25.0685 73.2115 25.1973 72.9644L26.1403 71.184C26.2709 70.9393 26.5805 70.8483 26.8298 70.9788L33.0741 74.2664C33.3252 74.3993 33.4208 74.7043 33.292 74.9514L32.349 76.7318C32.2184 76.9764 31.9088 77.0675 31.6595 76.937ZM26.3407 72.9969L31.6795 75.8072L32.151 74.917L26.8122 72.1067L26.3407 72.9969Z"
                    fill="#002976"
                  ></path>
                  <path
                    d="M25.023 74.3998L31.2674 77.6875L30.3243 79.4679L24.0799 76.1802L25.023 74.3998Z"
                    fill="#002976"
                  ></path>
                  <path
                    d="M30.0848 79.9135L23.8405 76.6259C23.5894 76.493 23.4938 76.188 23.6226 75.941L24.5656 74.1606C24.6962 73.9159 25.0057 73.8249 25.255 73.9554L31.4994 77.243C31.7505 77.3759 31.8461 77.6809 31.7173 77.9279L30.7743 79.7083C30.6437 79.953 30.3341 80.044 30.0848 79.9135ZM24.766 75.9735L30.1047 78.7838L30.5763 77.8936L25.2375 75.0833L24.766 75.9735Z"
                    fill="#002976"
                  ></path>
                  <path
                    d="M27.542 84.8507L25.0586 83.5429C23.5294 82.7361 22.9355 80.8649 23.7298 79.366L29.0418 69.3457C29.8385 67.845 31.7238 67.281 33.2554 68.086L35.9436 69.501C37.4728 70.3078 38.0666 72.179 37.2724 73.6779L37.0633 74.0701L35.2482 73.115L35.4573 72.7228C35.731 72.2049 35.5274 71.5587 34.9989 71.2787L32.3108 69.8636C31.7841 69.586 31.1288 69.7805 30.855 70.2984L25.543 80.3187C25.2693 80.8366 25.4729 81.4828 26.0014 81.7628L28.4849 83.0706C29.0115 83.3483 29.6669 83.1538 29.9406 82.6359L30.6762 81.2505L32.4913 82.2056L31.7557 83.5909C30.959 85.0916 29.0736 85.6556 27.542 84.8507Z"
                    fill="#002976"
                  ></path>
                  <path
                    d="M27.3057 85.2925L24.8222 83.9846C23.0444 83.0431 22.3526 80.8688 23.2756 79.1228L28.5876 69.1023C29.5149 67.3569 31.7078 66.6995 33.4887 67.6349L36.1768 69.05C37.9546 69.9915 38.6465 72.1658 37.7234 73.9117L37.5143 74.304C37.3838 74.5486 37.0743 74.6397 36.825 74.5092L35.01 73.5541C34.7589 73.4212 34.6633 73.1163 34.792 72.8692L35.0011 72.477C35.1442 72.2037 35.038 71.8649 34.7607 71.7177L32.0726 70.3026C31.7952 70.1554 31.4536 70.2595 31.3062 70.5322L25.9942 80.5528C25.8511 80.8261 25.9573 81.1649 26.2346 81.3121L28.7181 82.6199C28.9954 82.7671 29.3371 82.663 29.4845 82.3903L30.2201 81.0049C30.3507 80.7602 30.6601 80.6692 30.9094 80.7997L32.7245 81.7548C32.9756 81.8877 33.0711 82.1926 32.9424 82.4396L32.2068 83.8251C31.2795 85.5704 29.0865 86.2279 27.3057 85.2925ZM33.0173 68.5249C31.7368 67.8529 30.1609 68.3259 29.493 69.5795L24.181 79.6001C23.5149 80.8562 24.0137 82.4183 25.2912 83.0964L27.7747 84.4042C29.0552 85.0763 30.631 84.6033 31.2989 83.3496L31.7967 82.409L30.8913 81.9317L30.3935 82.8724C29.9892 83.6349 29.0262 83.9229 28.2504 83.5148L25.7669 82.2069C24.9892 81.7964 24.6858 80.8447 25.0925 80.0803L30.4045 70.0598C30.8088 69.2972 31.7718 69.0093 32.5477 69.4174L35.2358 70.8325C35.9952 71.2341 36.3032 72.1517 35.939 72.9066L36.8444 73.3839C37.4685 72.133 36.9651 70.605 35.7072 69.9424L33.0191 68.5273L33.0173 68.5249Z"
                    fill="#002976"
                  ></path>
                  <path
                    d="M36.2648 73.6525L36.4721 73.2578C37.2669 71.7548 36.6725 69.8878 35.1433 69.081L32.4552 67.6659C30.9254 66.8634 29.0401 67.4274 28.2415 68.9257L26.8477 71.5573L25.8005 71.005L24.8577 72.785L25.9048 73.3374L25.2705 74.5348L24.2233 73.9825L23.2805 75.7626L24.3277 76.3149L22.9338 78.9465C22.139 80.4496 22.7334 82.3166 24.2626 83.1234L26.7461 84.4312C28.2758 85.2338 30.1612 84.6698 30.9597 83.1715L31.6953 81.7861L29.8802 80.831L29.1446 82.2164C28.8709 82.7343 28.2174 82.9312 27.6889 82.6512L25.2054 81.3433C24.677 81.0633 24.4709 80.419 24.7471 79.8992L26.1409 77.2676L29.5219 79.0473L30.4647 77.2672L27.0837 75.4875L27.7181 74.29L31.099 76.0698L32.0418 74.2897L28.6609 72.51L30.0548 69.8783C30.3285 69.3604 30.982 69.1635 31.5105 69.4436L34.1986 70.8586C34.7252 71.1363 34.9331 71.783 34.657 72.3028L34.4479 72.695L36.263 73.6501L36.2648 73.6525Z"
                    fill="white"
                  ></path>
                  <path
                    d="M26.5091 84.8732L24.0257 83.5653C22.2478 82.6238 21.556 80.4494 22.479 78.7035L23.6393 76.5171L23.0436 76.2043C22.7925 76.0714 22.697 75.7665 22.8257 75.5194L23.7685 73.7393C23.8991 73.4947 24.2086 73.4037 24.4579 73.5342L25.0535 73.847L25.214 73.5413L24.6184 73.2285C24.3673 73.0957 24.2717 72.7907 24.4005 72.5437L25.3433 70.7636C25.4739 70.5189 25.7833 70.4279 26.0326 70.5584L26.6283 70.8712L27.7885 68.6848C28.7158 66.9394 30.9088 66.282 32.6896 67.2174L35.3777 68.6325C37.1555 69.574 37.8474 71.7484 36.9244 73.4943L36.7153 73.8866C36.5847 74.1312 36.2752 74.2222 36.026 74.0918L34.2109 73.1367C33.9598 73.0038 33.8642 72.6988 33.993 72.4518L34.2021 72.0595C34.3452 71.7862 34.239 71.4474 33.9616 71.3002L31.2735 69.8851C30.9962 69.738 30.6546 69.842 30.5072 70.1148L29.3469 72.3012L32.2738 73.8432C32.5249 73.9761 32.6205 74.281 32.4918 74.528L31.549 76.3081C31.4184 76.5528 31.1089 76.6438 30.8596 76.5133L27.9327 74.9713L27.7721 75.2769L30.6991 76.8189C30.9502 76.9518 31.0458 77.2568 30.917 77.5038L29.9742 79.2839C29.8436 79.5285 29.5341 79.6196 29.2849 79.4891L26.3579 77.9471L25.1976 80.1335C25.0545 80.4067 25.1607 80.7456 25.4381 80.8928L27.9215 82.2006C28.1989 82.3478 28.5405 82.2437 28.6879 81.971L29.4235 80.5856C29.5541 80.3409 29.8635 80.2499 30.1128 80.3804L31.9279 81.3355C32.179 81.4684 32.2745 81.7733 32.1458 82.0204L31.4102 83.4058C30.4829 85.1511 28.29 85.8086 26.5091 84.8732ZM23.969 75.552L24.5646 75.8648C24.8157 75.9976 24.9113 76.3026 24.7825 76.5496L23.3887 79.1813C22.7226 80.4374 23.2214 81.9995 24.4989 82.6777L26.9824 83.9855C28.2629 84.6576 29.8387 84.1846 30.5066 82.9309L31.0044 81.9902L30.099 81.513L29.6012 82.4537C29.1969 83.2162 28.2339 83.5042 27.458 83.096L24.9746 81.7882C24.1969 81.3776 23.8934 80.426 24.3002 79.6616L25.694 77.0299C25.8246 76.7852 26.1341 76.6942 26.3834 76.8247L29.3103 78.3667L29.7818 77.4767L26.8548 75.9346C26.6037 75.8018 26.5081 75.4968 26.6369 75.2498L27.2712 74.0523C27.4018 73.8076 27.7113 73.7166 27.9605 73.8471L30.8875 75.3891L31.3589 74.4991L28.4319 72.957C28.1808 72.8241 28.0853 72.5192 28.214 72.2722L29.6079 69.6405C30.0122 68.8779 30.9752 68.5899 31.7511 68.9981L34.4391 70.4132C35.1985 70.8148 35.5066 71.7324 35.1423 72.4873L36.0477 72.9646C36.6719 71.7137 36.1685 70.1857 34.9106 69.5231L32.2225 68.108C30.942 67.436 29.3661 67.9089 28.6982 69.1626L27.3043 71.7943C27.1738 72.039 26.8643 72.13 26.615 71.9995L26.0194 71.6867L25.548 72.5768L26.1436 72.8896C26.3947 73.0224 26.4903 73.3274 26.3615 73.5744L25.7272 74.7719C25.5966 75.0166 25.2871 75.1076 25.0379 74.9771L24.4422 74.6643L23.9708 75.5544L23.969 75.552Z"
                    fill="#002976"
                  ></path>
                  <path
                    d="M99.4783 37.0371C99.6565 37.0327 99.8029 36.9006 99.8199 36.7219L100.629 29.9836C100.659 29.7546 100.761 29.531 100.92 29.363C101.08 29.195 101.298 29.0755 101.533 29.034L108.214 27.898C108.406 27.8647 108.537 27.6832 108.503 27.4843C108.478 27.328 108.354 27.2099 108.197 27.1924L101.46 26.3827C100.981 26.3304 100.594 25.9692 100.511 25.4934L99.3746 18.8034C99.3413 18.6117 99.1598 18.4807 98.961 18.5142C98.8047 18.5394 98.6866 18.6636 98.6691 18.821L97.8597 25.5593C97.8297 25.7883 97.7284 26.0119 97.5685 26.1799C97.4018 26.3552 97.1906 26.4674 96.9563 26.5089L90.2748 27.6449C90.0831 27.6782 89.9522 27.8597 89.9856 28.0586C90.0109 28.2149 90.1351 28.333 90.2924 28.3505L97.0294 29.1602C97.5084 29.2124 97.8953 29.5737 97.9784 30.0495L99.1144 36.7395C99.1402 36.9171 99.293 37.0417 99.4712 37.0373L99.4783 37.0371ZM105.669 27.6118L101.401 28.3383C101.018 28.4049 100.666 28.5991 100.402 28.8767C100.138 29.1542 99.9618 29.5223 99.9215 29.9085L99.4078 34.2004L98.6816 29.9393C98.5479 29.151 97.9124 28.5391 97.1118 28.4592L92.8207 27.9453L97.0881 27.2188C97.4715 27.1522 97.8232 26.9581 98.0872 26.6805C98.3582 26.3956 98.5275 26.0348 98.5678 25.6487L99.0815 21.3568L99.8078 25.6179C99.9414 26.4062 100.577 27.018 101.378 27.098L105.669 27.6118Z"
                    fill="#002976"
                  ></path>
                  <path
                    d="M106.581 41.0576C106.682 41.0551 106.764 40.9809 106.773 40.8805L107.228 37.0949C107.245 36.9663 107.302 36.8407 107.392 36.7463C107.481 36.6519 107.604 36.5847 107.736 36.5614L111.489 35.9232C111.597 35.9045 111.671 35.8025 111.652 35.6908C111.638 35.603 111.568 35.5366 111.479 35.5268L107.695 35.072C107.425 35.0426 107.208 34.8396 107.161 34.5723L106.523 30.8139C106.504 30.7062 106.403 30.6326 106.291 30.6514C106.203 30.6656 106.137 30.7353 106.127 30.8237L105.672 34.6094C105.655 34.738 105.598 34.8636 105.509 34.958C105.415 35.0565 105.296 35.1195 105.165 35.1428L101.411 35.781C101.303 35.7997 101.23 35.9017 101.248 36.0135C101.263 36.1013 101.332 36.1676 101.421 36.1775L105.206 36.6323C105.475 36.6617 105.692 36.8646 105.739 37.1319L106.377 40.8904C106.392 40.9902 106.477 41.0602 106.577 41.0577L106.581 41.0576ZM110.059 35.7625L107.662 36.1706C107.446 36.208 106.282 35.3178 106.134 35.4738C105.986 35.6297 105.695 35.8761 105.672 36.093L106.542 39.4639L106.134 37.07C106.059 36.6271 106.922 35.9227 106.472 35.8778L102.841 35.9498L106.362 36.718C106.577 36.6806 106.906 36.629 107.055 36.473C107.207 36.313 106.776 35.6235 106.799 35.4066L106.359 32.2484L105.925 35.8437C106 36.2866 107.223 36.2359 107.673 36.2808L110.059 35.7625Z"
                    fill="#002976"
                  ></path>
                  <path
                    d="M78.5171 52.374C78.526 48.5112 81.6646 45.3871 85.5273 45.396L113.649 45.4606C117.512 45.4694 120.636 48.608 120.627 52.4707L120.51 103.269C120.501 107.132 117.363 110.256 113.5 110.248L85.3785 110.183C81.5157 110.174 78.3916 107.035 78.4004 103.173L78.5171 52.374Z"
                    fill="white"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M113.647 46.3348L85.5253 46.2702C82.1454 46.2624 79.3992 48.9961 79.3914 52.376L79.2747 103.175C79.2669 106.555 82.0006 109.301 85.3805 109.309L113.502 109.373C116.882 109.381 119.628 106.647 119.636 103.267L119.753 52.4687C119.76 49.0888 117.027 46.3426 113.647 46.3348ZM85.5273 45.396C81.6646 45.3871 78.526 48.5112 78.5171 52.374L78.4004 103.173C78.3916 107.035 81.5157 110.174 85.3785 110.183L113.5 110.248C117.363 110.256 120.501 107.132 120.51 103.269L120.627 52.4707C120.636 48.608 117.512 45.4694 113.649 45.4606L85.5273 45.396Z"
                    fill="#002E83"
                  ></path>
                  <path
                    d="M82.4624 53.9861C82.4679 51.5719 84.4295 49.6192 86.8437 49.6248L112.315 49.6833C114.73 49.6889 116.682 51.6505 116.677 54.0647L116.648 66.4482C116.643 68.8624 114.681 70.815 112.267 70.8095L86.7952 70.751C84.381 70.7454 82.4284 68.7838 82.4339 66.3696L82.4624 53.9861Z"
                    fill="white"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M112.313 50.5576L86.8417 50.4991C84.9103 50.4946 83.3411 52.0567 83.3366 53.9881L83.3082 66.3716C83.3037 68.303 84.8658 69.8723 86.7972 69.8767L112.269 69.9352C114.2 69.9397 115.769 68.3776 115.774 66.4462L115.802 54.0627C115.807 52.1313 114.245 50.562 112.313 50.5576ZM86.8437 49.6248C84.4295 49.6192 82.4679 51.5719 82.4624 53.9861L82.4339 66.3696C82.4284 68.7838 84.381 70.7454 86.7952 70.751L112.267 70.8095C114.681 70.815 116.643 68.8624 116.648 66.4482L116.677 54.0647C116.682 51.6505 114.73 49.6889 112.315 49.6833L86.8437 49.6248Z"
                    fill="#002E83"
                  ></path>
                  <path
                    d="M91.6145 79.916C91.6101 81.8606 90.1335 83.4337 88.3166 83.4295C86.4997 83.4253 85.0304 81.8455 85.0349 79.9009C85.0393 77.9563 86.5159 76.3833 88.3328 76.3874C90.1497 76.3916 91.619 77.9714 91.6145 79.916Z"
                    fill="#002976"
                  ></path>
                  <path
                    d="M91.5923 89.7764C91.5878 91.721 90.1113 93.294 88.2944 93.2899C86.4775 93.2857 85.0082 91.7059 85.0127 89.7613C85.0171 87.8167 86.4937 86.2436 88.3106 86.2478C90.1275 86.252 91.5968 87.8318 91.5923 89.7764Z"
                    fill="#002976"
                  ></path>
                  <path
                    d="M91.5689 99.6353C91.5644 101.58 90.0879 103.153 88.271 103.149C86.454 103.145 84.9848 101.565 84.9892 99.6202C84.9937 97.6755 86.4702 96.1025 88.2871 96.1067C90.1041 96.1109 91.5733 97.6907 91.5689 99.6353Z"
                    fill="#002976"
                  ></path>
                  <path
                    d="M99.5088 79.9356C99.5044 81.8802 98.0278 83.4532 96.2109 83.449C94.394 83.4449 92.9247 81.8651 92.9292 79.9204C92.9336 77.9758 94.4102 76.4028 96.2271 76.407C98.044 76.4111 99.5133 77.9909 99.5088 79.9356Z"
                    fill="#002976"
                  ></path>
                  <path
                    d="M99.4871 89.7959C99.4826 91.7405 98.0061 93.3136 96.1892 93.3094C94.3723 93.3052 92.903 91.7254 92.9074 89.7808C92.9119 87.8362 94.3884 86.2631 96.2054 86.2673C98.0223 86.2715 99.4916 87.8513 99.4871 89.7959Z"
                    fill="#002976"
                  ></path>
                  <path
                    d="M99.4637 99.6548C99.4592 101.599 97.9827 103.172 96.1657 103.168C94.3488 103.164 92.8795 101.584 92.884 99.6397C92.8885 97.6951 94.365 96.122 96.1819 96.1262C97.9988 96.1304 99.4681 97.7102 99.4637 99.6548Z"
                    fill="#002976"
                  ></path>
                  <path
                    d="M107.404 79.9536C107.4 81.8982 105.923 83.4713 104.106 83.4671C102.289 83.4629 100.82 81.8831 100.824 79.9385C100.829 77.9939 102.305 76.4209 104.122 76.425C105.939 76.4292 107.409 78.009 107.404 79.9536Z"
                    fill="#002976"
                  ></path>
                  <path
                    d="M107.383 89.8145C107.379 91.7591 105.902 93.3321 104.085 93.3279C102.268 93.3238 100.799 91.744 100.804 89.7993C100.808 87.8547 102.285 86.2817 104.102 86.2859C105.919 86.2901 107.388 87.8699 107.383 89.8145Z"
                    fill="#002976"
                  ></path>
                  <path
                    d="M107.36 99.6704C107.355 101.615 105.879 103.188 104.062 103.184C102.245 103.18 100.776 101.6 100.78 99.6553C100.784 97.7107 102.261 96.1377 104.078 96.1418C105.895 96.146 107.364 97.7258 107.36 99.6704Z"
                    fill="#002976"
                  ></path>
                  <path
                    d="M109.858 79.9147C109.858 77.7419 111.62 75.9805 113.793 75.9805C115.965 75.9805 117.727 77.7419 117.727 79.9147V100.897C117.727 103.07 115.965 104.831 113.793 104.831C111.62 104.831 109.858 103.07 109.858 100.897V79.9147Z"
                    fill="#002976"
                  ></path>
                </svg>
              </div>
              <div className="my-3 text-sm">
                <p>
                  Bên cạnh lương, đâu là những yếu tố cần quan tâm khi tìm việc?
                </p>
                <p className="text-[#888888]">
                  Dù tiền lương là yếu tố quan trọng hàng đầu để thu hút ứng cử
                  viên xin việc, song để làm việc lâu dài và phát triển sự
                  nghiệp của bản thân tại công ty thì bạn cần nhiều hơn thế. Vậy
                  bên cạnh lương, đâu là những yếu tố cần quan tâm khi tìm việc?
                </p>
                <ul
                  className="ml-2 text-[#888888]"
                  style={{ listStyleType: "square" }}
                >
                  <li>Địa điểm làm việc</li>
                  <li>Trang thiết bị làm việc</li>
                  <li>Phúc lợi</li>
                  <li>Cơ hội thăng tiến</li>
                  <li>Môi trường làm việc</li>
                </ul>
                <div className="text-end">
                  <button className="mt-2 text-blue-600">Xem thêm</button>
                </div>
                <p>Đàm phán lên lương – Nói sao cho khéo?</p>
                <p className="text-[#888888]">
                  Đàm phán lên lương chính là việc thảo luận về cơ hội tiếp tục
                  hợp tác nhưng với mức lương cao hơn do số năm kinh nghiệm và
                  hiệu quả công việc trong thời gian vừa rồi của bạn đều tăng.
                </p>
                <p className="text-[#888888]">
                  Cuộc đàm phán lên lương sẽ hiệu quả nhất khi cấp trên hiểu
                  được rằng việc trả lương cho bạn sẽ xứng đáng với các kĩ năng
                  và công sức, kinh nghiệm của bạn khi làm việc tại công ty,
                  doanh nghiệp.
                </p>
                <div className="text-end">
                  <button className="mt-2 text-blue-600">Xem thêm</button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <div className="rounded-md bg-white p-4">
              <div className="my-2">
                <p className="text-2xl font-bold">
                  Phân biệt lương Gross lương Net và hướng dẫn cách tính
                </p>
                <p className="my-2 text-sm italic">
                  Lương Gross và lương Net là hai khoản tiền lương có mối liên
                  hệ mật thiết với nhau, được các nhà tuyển dụng sử dụng trong
                  các hợp đồng lao động, hợp đồng làm việc với người lao động.
                  Vậy hai khoản tiền này khác nhau như thế nào và cách tính chi
                  tiết ra sao?
                </p>
              </div>
              <div className="my-2">
                <p className="text-2xl font-bold">
                  1. Phân biệt Lương Gross và lương Net
                </p>
                <p className="my-2 text-sm italic">
                  Đối với người lao động khi tìm kiếm việc làm sẽ thường xuyên
                  nhìn thấy các thông tin về lương Gross/Net từ các nhà tuyển
                  dụng. Vậy lương gross là gì và lương Net là gì? Đây là khái
                  niệm mà bất cứ người lao động tìm việc cũng nên biết để hưởng
                  đúng và đủ quyền lợi của mình.
                </p>
              </div>
              <div className="my-2">
                <p className="text-2xl font-bold italic">
                  1.1 Lương Gross là gì?
                </p>
                <p className="my-2 text-sm">
                  Lương Gross là tổng lương mà người lao động nhận được hàng
                  tháng bao gồm lương cơ bản và các khoản trợ cấp, phụ cấp
                  lương, tiền hoa hồng... trong đó bao gồm cả tiền đóng Bảo hiểm
                  và tiền{" "}
                  <span className="font-bold">thuế thu nhập cá nhân</span>{" "}
                  (TNCN) (nếu có).
                </p>
                <p className="my-2 text-sm">
                  Theo đó, khi người lao động được trả theo lương Gross có nghĩa
                  là người lao động đó được trả lương gộp bao gồm cả các khoản
                  gồm: Bảo hiểm xã hội (BHXH); bảo hiểm y tế (BHYT); bảo hiểm
                  thất nghiệp (BHTN); Thuế TNCN người lao động sẽ phải tự đóng
                  theo tỷ lệ trích từ tiền lương hằng tháng của người lao động.
                </p>
                <p className="my-2 text-sm">
                  Căn cứ theo quy định tại Quyết định 595/QĐ-BHXH{" "}
                  <span className="font-bold">
                    tỷ lệ trích tiền lương đóng bảo hiểm{" "}
                  </span>{" "}
                  của người lao động Việt Nam năm 2022 lần lượt là BHXH (8%)
                  BHTN (1%) BHYT (1.5%).
                </p>
                <p className="my-2 text-sm">
                  Ví dụ: Trên hợp đồng lao động ghi trả lương Gross cho bạn là
                  10 triệu/tháng có nghĩa là bạn phải trích đóng 10,5% trong quỹ
                  lương nhận được cho BHXH, BHYT, BHTN; (trong đó 8% BHXH; 1,5%
                  BHYT; 1% BHTN) theo quy định của nhà nước và số tiền bạn được
                  hưởng mỗi tháng là 8.950.000 đồng (tương đương với mức lương
                  Net là 8.950.000 ghi trên hợp đồng).
                </p>
              </div>
              <div className="my-2">
                <p className="text-2xl font-bold italic">
                  1.2 Lương Net là gì?
                </p>
                <p className="my-2 text-sm">
                  Lương Net là tiền lương mà người lao động thực nhận được từ
                  đơn vị, người sử dụng lao động trả hằng tháng sau khi đã trừ
                  hết các loại khoản chi phí bao gồm tiền đóng bảo hiểm và khác
                  khoản tiền thuế TNCN.
                </p>
                <p className="my-2 text-sm">
                  Như vậy lương Net là tiền lương thực nhận hay thu nhập sau
                  thuế của người lao động có thể bỏ túi.
                </p>
              </div>
              <div className="my-2">
                <p className="text-2xl font-bold italic">
                  1.3 Mối liên hệ giữa lương Net và lương Gross
                </p>
                <p className="my-2 text-sm">
                  Mối liên hệ giữa lương Net và Gross được tính theo công thức
                  sau:
                </p>
                <p className="my-2 text-sm font-bold italic">
                  Lương Net = Lương Gross - (Tiền BHXH + BHYT + BHTN + thuế
                  TNCN)
                </p>
              </div>
              <div className="my-2">
                <p className="text-2xl font-bold">
                  2. Cách tính lương Gross và lương Net
                </p>
                <p className="my-2 text-sm">
                  Nhằm giúp người lao động có thể chủ động trong việc tính lương
                  Gross sang Net hoặc Net sang Gross được thuận tiện.
                  Vietnamworks cung cấp công cụ tính lương Gross và lương Net
                  online năm 2022 cụ thể như sau:
                </p>
                <p className="my-2 text-sm">
                  Lưu ý là cách tính lương sau đây áp dụng mức giảm trừ gia cảnh
                  mới nhất năm 2022 là 11.000.000 đồng/tháng tương đương với
                  132.000.000 đồng/năm đối với người nộp thuế và 4.400.000
                  đồng/tháng đối với mỗi người phụ thuộc căn cứ Theo Nghị quyết
                  số 954/2020/UBTVQH14.
                </p>
                <p className="my-2 text-sm">
                  Áp dụng{" "}
                  <span className="font-bold">
                    mức lương tối thiểu vùng năm 2022
                  </span>{" "}
                  có hiệu lực từ ngày 01/07/2022 và mức lương cơ sở năm 2022 là
                  1.490.000 đồng.
                </p>
              </div>
              <div className="my-2">
                <p className="text-2xl font-bold italic">
                  2.1 Cách tính lương Net to Gross
                </p>
                <p className="my-2 text-sm">
                  Ví dụ 1: Lao động A làm việc tại 1 công ty tư nhân tại Hà Nội
                  (Vùng I) với mức lương thực nhận (lương Net) hàng tháng là
                  30.000.000 đồng. Lao động A không có người phụ thuộc và đây là
                  khoản thu nhập chịu thuế TNCN duy nhất.
                </p>
                <p className="my-2 text-sm">
                  Vậy Lương Gross lao động A nhận được là bao nhiêu?
                </p>
                <p className="my-2 text-sm">
                  Các khoản tiền đóng BHXH, BHYT, BHTN = 3.189.773 đồng, trong
                  đó
                </p>
                <p className="my-2 text-sm">
                  Bảo hiểm xã hội (8%) = 2.384.000 đồng
                </p>
                <p className="my-2 text-sm">
                  Bảo hiểm y tế (1.5%) = 447.000 đồng
                </p>
                <p className="my-2 text-sm">
                  Bảo hiểm thất nghiệp (1%) = 358.773 đồng
                </p>
                <p className="my-2 text-sm">
                  Giảm trừ gia cảnh bản thân = 11,000,000 đồng
                </p>
                <p className="my-2 text-sm">
                  Giảm trừ gia cảnh người phụ thuộc = 0 đồng
                </p>
                <p className="my-2 text-sm">
                  Thuế TNCN = 2.687.500 đồng. Cụ thể
                </p>
                <table className="text-sm">
                  <tbody>
                    <tr>
                      <td className="pr-2">
                        <strong>Mức chịu thuế</strong>
                      </td>
                      <td className="pr-2">
                        <strong>Thuế suất</strong>
                      </td>
                      <td>
                        <strong>Tiền nộp</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="pr-2">Đến 5 triệu VNĐ</td>
                      <td>5%</td>
                      <td>250.000</td>
                    </tr>
                    <tr>
                      <td className="pr-2">
                        Trên 5 triệu VNĐ đến 10 triệu VNĐ
                      </td>
                      <td>10%</td>
                      <td>500.000</td>
                    </tr>
                    <tr>
                      <td className="pr-2">
                        Trên 10 triệu VNĐ đến 18 triệu VNĐ
                      </td>
                      <td>15%</td>
                      <td>1.200.000</td>
                    </tr>
                    <tr>
                      <td className="pr-2">
                        Trên 18 triệu VNĐ đến 32 triệu VNĐ
                      </td>
                      <td>20%</td>
                      <td>737.500</td>
                    </tr>
                    <tr>
                      <td className="pr-2">
                        Trên 32 triệu VNĐ đến 52 triệu VNĐ
                      </td>
                      <td>25%</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <td className="pr-2">
                        Trên 52 triệu VNĐ đến 80 triệu VNĐ
                      </td>
                      <td>30%</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <td className="pr-2">Trên 80 triệu VNĐ</td>
                      <td>35%</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Thuế TNCN</strong>
                      </td>
                      <td>
                        <strong>Tổng</strong>
                      </td>
                      <td>
                        <strong>2.687.500</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p className="my-1 text-sm italic">
                  Bảng tính chi tiết tiền thuế TNCN
                </p>
                <p className="my-1 text-sm">
                  ={">"} Thu nhập chịu thuế = Lương Net - các khoản giảm trừ +
                  Thuế TNCN = 21,687,500 đồng
                </p>
                <p className="my-1 text-sm">
                  Thu nhập trước thuế = Lương Net + Thuế TNCN = 30.000.000 +
                  2.687.500 = 32.687.500 đồng
                </p>
                <p className="my-1 text-sm">
                  Lương Gross = Thu nhập trước thuế + Tiền đóng bảo hiểm =
                  32.687.500 + 3.189.773 = 35.877.273 đồng.
                </p>
                <p className="my-1 text-sm">
                  Như vậy, với mức lương Net lao động A được nhận (30.000.000
                  đồng) thì mức lương Gross tương ứng của lao động A được nhận
                  sẽ là 35.877.273 đồng.
                </p>
                <p className="my-1 text-sm">
                  Bên cạnh đó trong trường hợp này tổng chi phí tiền lương công
                  ty của A phải trả cho lao đông A sẽ là:
                </p>
                <table className="my-2 text-sm">
                  <tbody>
                    <tr>
                      <td className="pr-2">Lương Gross</td>
                      <td>35.877.273</td>
                    </tr>
                    <tr>
                      <td className="pr-2">Bảo hiểm xã hội (17%)</td>
                      <td>5.066.000</td>
                    </tr>
                    <tr>
                      <td className="pr-2">
                        Bảo hiểm Tai nạn lao động - Bệnh nghề nghiệp (0.5%)
                      </td>
                      <td>149.000</td>
                    </tr>
                    <tr>
                      <td className="pr-2">Bảo hiểm y tế (3%)</td>
                      <td>894.000</td>
                    </tr>
                    <tr>
                      <td className="pr-2">Bảo hiểm thất nghiệp (1%)</td>
                      <td>358.773</td>
                    </tr>
                    <tr>
                      <td className="pr-2">
                        <strong>Tổng cộng</strong>
                      </td>
                      <td>42,345,046</td>
                    </tr>
                  </tbody>
                </table>
                <p className="my-2 text-sm italic">
                  Tiền lương người sử dụng lao động trả cho lao động A
                </p>
                <div className="my-2">
                  <p className="text-2xl font-bold italic">
                    2.2. Cách tính lương Gross to Net
                  </p>
                  <p className="my-2 text-sm">
                    Ví dụ 2:Lao động B làm việc tại 1 công ty tư nhân tại Hà Nội
                    (Vùng I) với mức lương gộp (lương Gross) nhận được hàng
                    tháng là 30.000.000 đồng. Lao động B không có người phụ
                    thuộc và đây là khoản thu nhập chịu thuế TNCN duy nhất.
                  </p>
                  <p className="my-2 text-sm">
                    Vậy Lương Net lao động B nhận được là bao nhiêu?
                  </p>
                  <p className="my-2 text-sm italic">
                    Đối chiếu cách tính thủ công từ lương Gross sang Net
                  </p>
                  <p className="my-2 text-sm">
                    Lương Gross của lao động B = 30.000.000 đồng
                  </p>
                  <p className="my-2 text-sm">
                    Bảo hiểm xã hội (8%) = 2.384.000 đồng
                  </p>
                  <p className="my-2 text-sm">
                    Bảo hiểm y tế (1.5%) = 447.000 đồng
                  </p>
                  <p className="my-2 text-sm">
                    Bảo hiểm thất nghiệp (1%) = 300.000 đồng
                  </p>
                  <p className="my-2 text-sm">
                    ={">"} Các khoản tiền đóng BHXH, BHYT, BHTN = 3.131.000 đồng
                  </p>
                  <p className="my-2 text-sm">
                    ={">"} Thu nhập trước thuế = Lương Gross - tiền đóng bảo
                    hiểm = 30.000.000 - 3.131.000 = 26.869.000 đồng
                  </p>
                  <p className="my-2 text-sm">
                    Giảm trừ gia cảnh bản thân = 11.000.000 đồng
                  </p>
                  <p className="my-2 text-sm">
                    Giảm trừ gia cảnh người phụ thuộc = 0 đồng
                  </p>
                  <p className="my-2 text-sm">
                    ={">"} Thu nhập chịu thuế = thu nhập trước thuế - giảm trừ
                    gia cảnh - giảm trừ người phụ thuộc = 15.869.000 đồng
                  </p>
                  <p className="my-2 text-sm">
                    Thuế thu nhập cá nhân = 1.630.350 đồng, cụ thể:
                  </p>
                  <table className="my-2 text-sm">
                    <tbody>
                      <tr>
                        <td className="pr-2">
                          <strong>Mức chịu thuế</strong>
                        </td>
                        <td className="pr-2">
                          <strong>Thuế suất</strong>
                        </td>
                        <td className="pr-2">
                          <strong>Tiền nộp</strong>
                        </td>
                      </tr>
                      <tr>
                        <td className="pr-2">Đến 5 triệu VNĐ</td>
                        <td className="pr-2">5%</td>
                        <td className="pr-2">250.000</td>
                      </tr>
                      <tr>
                        <td className="pr-2">
                          Trên 5 triệu VNĐ đến 10 triệu VNĐ
                        </td>
                        <td className="pr-2">10%</td>
                        <td className="pr-2">500.000</td>
                      </tr>
                      <tr>
                        <td className="pr-2">
                          Trên 10 triệu VNĐ đến 18 triệu VNĐ
                        </td>
                        <td className="pr-2">15%</td>
                        <td className="pr-2">880.350</td>
                      </tr>
                      <tr>
                        <td className="pr-2">
                          Trên 18 triệu VNĐ đến 32 triệu VNĐ
                        </td>
                        <td className="pr-2">20%</td>
                        <td className="pr-2">0</td>
                      </tr>
                      <tr>
                        <td>Trên 32 triệu VNĐ đến 52 triệu VNĐ</td>
                        <td>25%</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td>Trên 52 triệu VNĐ đến 80 triệu VNĐ</td>
                        <td>30%</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td>Trên 80 triệu VNĐ</td>
                        <td>35%</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Thuế thu nhập cá nhân</strong>
                        </td>
                        <td>
                          <strong>Tổng</strong>
                        </td>
                        <td>
                          <strong>1.630.350</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="my-2 text-sm italic">
                    Bảng tính thuế TNCN chi tiết của lao động B
                  </p>
                  <p className="my-2 text-sm">
                    Như vậy Lương Net = (Thu nhập trước thuế - Thuế thu nhập cá
                    nhân) = 25.238.650 đồng
                  </p>
                  <p className="my-2 text-sm">
                    Như vậy mức lương Net to Gross mà lao động B nhận được là
                    25.238.650 đồng.
                  </p>
                  <p className="my-2 text-sm">
                    Trong trường hợp này người sử dụng lao động phải trả lương
                    cho lao động B tổng số tiền là:
                  </p>
                  <table className="my-2 text-sm">
                    <tbody>
                      <tr>
                        <td>Lương Gross</td>
                        <td>30.000.000</td>
                      </tr>
                      <tr>
                        <td>Bảo hiểm xã hội (17%)</td>
                        <td>5.066.000</td>
                      </tr>
                      <tr>
                        <td className="pr-2">
                          Bảo hiểm Tai nạn lao động - Bệnh nghề nghiệp (0.5%)
                        </td>
                        <td>149.000</td>
                      </tr>
                      <tr>
                        <td>Bảo hiểm y tế (3%)</td>
                        <td>894.000</td>
                      </tr>
                      <tr>
                        <td>Bảo hiểm thất nghiệp (1%)</td>
                        <td>300.000</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Tổng cộng</strong>
                        </td>
                        <td>36.409.000</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="my-2 text-sm italic">
                    Tiền lương người sử dụng lao động trả cho lao động B
                  </p>
                  <div className="my-2">
                    <p className="text-2xl font-bold italic">
                      3. Nhận lương Gross hay lương Net có lợi hơn
                    </p>
                    <p className="my-2 text-sm">
                      Như đã đề cập bên trên, lương Net là tiền lương hàng tháng
                      mà người lao động sẽ nhận được sau khi doanh nghiệp đã chi
                      trả các loại phí như phí BHXH, BHYT, BHTN, thuế TNCN trong
                      khi lương Gross thì ngược lại. Việc trích trong quỹ lương
                      Gross để chi trả cho phí bảo hiểm và thuế đôi khi người
                      lao động sẽ có cảm giác thu nhập của mình bị giảm đi.
                    </p>
                    <p className="my-2 text-sm">
                      Đứng trên góc độ của người sử dụng lao động (doanh nghiệp)
                      thông thường sẽ trả lương Net cho người lao động để có thể
                      dễ dàng tính các khoản phí bảo hiểm và thuế khác. Tuy
                      nhiên nếu đứng trên góc độ người lao động việc chọn cách
                      trả lương Gross hay lương Net có lợi hơn thì không phải ai
                      cũng biết.
                    </p>
                    <p className="my-2 text-sm">
                      Trong trường hợp các công ty làm đúng luật, trả lương và
                      đóng đúng mức phí bảo hiểm và thuế TNCN… thì dù nhận lương
                      gộp hay lương thực nhận bạn đều có mức quyền lợi được
                      hưởng như nhau.
                    </p>
                    <p className="my-2 text-sm">
                      Trong trường hợp các công ty không làm đúng luật, trả
                      lương thực nhận (Net) tuy nhiên lại khai báo với cơ quan
                      BHXH, cơ quan thuế mức lương thấp hơn để giảm thuế phải
                      đóng thì quyền lợi của bạn nhận được khi xảy ra các sự cố
                      ngoài ý muốn sẽ bị giảm đi.
                    </p>
                    <p className="my-2 text-sm">
                      Như vậy, khi lựa chọn cách trả lương cho mình giữa lương
                      Gross và lương Net bạn nên lựa chọn hình thức trả lương
                      Gross để được đóng các khoản phí đúng với mức lương và
                      nhận quyền lợi tương đương, đồng thời tránh được các vấn
                      đề nhạy cảm giữa người lao động và nhà doanh nghiệp. Tuy
                      nhiên, khi nhận lương Gross bạn sẽ phải tự tính toán mức
                      đóng BHXH, BHYT, BHTN và làm việc với cơ quan thuế điều
                      này sẽ khiến nhiều người lao động e ngại hơn so với việc
                      nhận lương net.
                    </p>
                    <p className="my-2 text-sm">
                      Người lao động khi xin việc cần phải lưu ý hình thức trả
                      lương Gross hoặc lương Net của đơn vị tuyển dụng để có thể
                      tính toán mức lương nhận về phù hợp cho mình. Nếu công ty
                      đưa ra 2 mức lương khác nhau cho lương gộp Gross và lương
                      thực nhận Net bạn đọc có thể tham khảo cách tính lương
                      trên để có thể quy đổi lương Net sang Gross hoặc ngược lại
                      để chủ động hơn trong việc lựa chọn mức lương mong muốn
                      phù hợp.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalaryCalculator;
