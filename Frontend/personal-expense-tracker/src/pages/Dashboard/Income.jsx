import React, { useState} from 'react'
import { toast } from 'react-hot-toast';
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IncomeOverview from "../../components/Income/IncomeOverview"
import axiosInstance from '../../utils/axiosInstance';
import { API_PATH } from '../../utils/apiPath';
import { useEffect } from 'react';
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";


const Income = () => {

  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const [OpenAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  //get all income details
  const fetchIncomeDetails = async () => {

    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(`${API_PATH.INCOME.GET_ALL_INCOME}`);

      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong", error)
    } finally {
      setLoading(false);
    }
  };


  //handle add income
  const handleAddIncome = async (income) => {

    const { source, amount, date, icon } = income;

    //validation checks
    if (!source.trim()) {
      toast.error("Source is required");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0");
      return;
    }

    if (!date) {
      toast.error("Date is Required");
      return;
    }

    try {
      await axiosInstance.post(API_PATH.INCOME.ADD_INCOME, {
        source, amount, date, icon,
      });

      setOpenAddIncomeModal(false);
      toast.success("Income added successfully");
      fetchIncomeDetails();
    } catch (error) {
      console.error("Something went wrong", error.response?.data?.message || error.message);
    }
  };


  //delete income
  const deleteIncome = async (id) => { }


  //handle doenload income
  const handleDownloadIncomeDetails = async () => { }


  useEffect(() => {
    fetchIncomeDetails()
    return () => { }
  }, [])

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => { setOpenAddIncomeModal(true) }}
            />
          </div>
        </div>

        <Modal
          isOpen={OpenAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>


      </div>
    </DashboardLayout>
  )
}

export default Income