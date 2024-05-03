import React, { useState } from "react";
// import { Button, Modal, Space } from 'antd';
import { PlusOutlined, SortAscendingOutlined } from "@ant-design/icons";
// import Swal from "sweetalert2";

// import { useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom"; // Import useHistory instead of useNavigate

import { Button, DatePicker, Input, Modal, Space, message } from "antd";
import axios from "axios";
import { UPDATE_USER } from "../constants/Constants";
import { GET_USER } from "../constants/Constants";
// import "./Modal.css";
const EditUser = ({ data }) => {
  // const navigate = useNavigate();
  const history = useHistory(); // Use useHistory hook for navigation

  const [userData, setuserData] = useState(data);
  const [open, setOpen] = useState(false);
  const [firstname, setFirstname] = useState(userData?.firstname || "");
  const [lastname, setLastname] = useState(userData?.lastname || "");
  const [username, setUsername] = useState(userData?.username || "");
  const [phone, setPhone] = useState(userData?.phone || "");
  const [altNumber, setAltNumber] = useState(userData?.altNumber || "");

  const [email, setEmail] = useState(userData?.email || "");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(userData?.role || "USER");
  const [status, setStatus] = useState(userData?.status || "active");
  const [address, setAddress] = useState(userData?.address || "");
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };

  console.log(userData);

  const handleUpdate = async () => {
    try {
      const updatedData = {
        firstname,
        lastname,
        username,
        phone,
        altNumber,
        email,
        password,
        role,
        status,
        address,
      };
      const userId = data._id;

      // Make a PUT or PATCH request to update the user by ID
      const res = await axios.put(
        `${ UPDATE_USER + userId}`,
        updatedData
      );
      const updData = await axios.get(
        `${ GET_USER + '/' + userId}`,
        updatedData
      );

      // Show success notification or perform other actions if needed
      setuserData(updData.data);
      //   Swal.fire({
      //     position: "center",
      //     icon: "success",
      //     title: "Data updated",
      //     showConfirmButton: false,
      //     timer: 2500,
      //   });
      message.success("data updated ");
      // navigate("/admin");
      setTimeout(() => {
        // navigate('/');
        handleOk();
        history.push("/tables"); // Correct the typo to history.push
        window.location.reload();
      }, 2000);
      console.log("User updated successfully");
    } catch (error) {
      // Show error notification if update fails
      // message.error("Failed to update user");
      console.error("Error updating user:", error);
    }
  };

  // console.log(userData?.remark1);

  const { RangePicker } = DatePicker;
  const { TextArea } = Input;
  //   ===== form details code
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [disabled, setDisabled] = useState(true);

  const [firstRemark, setfirstRemark] = useState(userData?.Remark1 || ""); // Use data.remark1 as initial value
  const [secondRemark, setsecondRemark] = useState(userData?.Remark2 || ""); // Use data.remark1 as initial value
  const [selectedStatus, setselectedStatus] = useState(userData?.status || ""); // Use data.remark1 as initial value

  //   modal useState
  const handleCancel = () => {
    setOpen(false);
  };

  const isRejectedSelected = selectedStatus === "Rejected";

  const handleChangeStatus = (event) => {
    setStatus(event.target.value); // Update the state with the new selected value
    // Any other logic you might want to perform on change
  };
  return (
    <>
      <Space>
        <Button
          type="primary"
          size="small"
          className="bg-blue-500 hover:bg-blue-700 rounded"
          onClick={showModal}
        >
          view
        </Button>
      </Space>
      <Modal
        visible={open}
        title="User Details"
        onOk={handleOk}
        onCancel={handleCancel}
        // className="text-black"
        // style={{ color: '#ffff' }} // Adjust the width here
        width={1000}
        okButtonProps={{
          style: {
            color: "black",
            height: "auto",
            fontSize: "14px",
            maxHeight: "100vh",
          },
        }}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <OkBtn />
          </>
        )}
      >
        {/* Your content here */}
        <div className="text-black">
          {/* < > */}

          <div className="flex flex-col gap-9 bg-transparent">
            {/* <!-- Contact Form --> */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-none dark:bg-transparent">
              <form action="#">
                <div className=" p-6.5 gap-10 ">
                  {/* Row -1 */}
                  <div className="mb-3 flex gap-10">
                    <div className="flex">
                      <p className="text-[1.05rem] font-semibold		">Status :</p>
                      <p className="  text-green mx-2 border-x-2 px-2 text-center text-[1.05rem] ">
                        {" "}
                        {userData?.status}
                      </p>
                    </div>
                    <div className="flex">
                      <p className="text-[1.05rem] font-semibold		">
                        User Name :
                      </p>

                      <p className="  text-green mx-2 border-x-2 px-2 text-center text-[1.05rem] ">
                        {" "}
                        {userData?.username}
                      </p>
                    </div>
                  </div>
                  <div className="mb-4.5 flex flex-col mb-2 gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black font-semibold	 dark:text-black">
                        First Name
                      </label>
                      <input
                        type="text"
                        defaultValue={userData?.firstname}
                        onChange={(e) => {
                          setFirstname(e.target.value);
                        }}
                        // disabled
                        placeholder="Enter your first name"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black font-semibold	 dark:text-black">
                        Last Name
                      </label>
                      <input
                        type="text"
                        defaultValue={userData?.lastname}
                        onChange={(e) => {
                          setLastname(e.target.value);
                        }}
                        // disabled
                        placeholder="Enter your first name"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>
                  {/* Row -2 */}

                  <div className="mb-4.5 flex flex-col  mb-2 gap-6 xl:flex-row">
                    <div className="mb-4.5 w-full">
                      <label className="mb-2.5 block text-black font-semibold	 dark:text-black">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        defaultValue={userData?.email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        // disabled
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                    <div className="mb-4.5 w-full">
                      <label className="mb-2.5 block text-black font-semibold	 dark:text-black">
                        Phone Number
                      </label>
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        defaultValue={userData?.phone}
                        // disabled
                        onChange={(e) => {
                          setPhone(e.target.value);
                        }}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="gap-20  mb-2 lg:flex">
                    <div className="mb-4.5 w-full">
                      <label className="mb-2.5 block text-black font-semibold	 dark:text-black">
                        {" "}
                        Status
                      </label>
                      <div className="relative z-20 w-full bg-transparent dark:bg-form-input">
                        <select
                          className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary "
                          value={status} // Set value attribute to manage the selected value
                          onChange={handleChangeStatus}
                        >
                          <option value="">Select Status</option>
                          <option value="active">Active</option>
                          <option value="closed">Closed</option>
                        </select>
                        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                          <svg
                            className="fill-current"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g opacity="0.8">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                fill=""
                              ></path>
                            </g>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* About you  */}
                  <div className="w-full  mb-2">
                    {" "}
                    <label className="mb-2.5 block text-black font-semibold	 dark:text-black">
                      {" "}
                      Address
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Type your message"
                      defaultValue={userData?.address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                      // disabled
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent  font-medium px-3 py-3 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    ></textarea>
                  </div>
                  <div className=" flex gap-20 ">
                    <Button
                      type="primary"
                      size="small"
                      className="bg-blue-500 hover:bg-blue-700 rounded"
                      onClick={handleUpdate}
                    >
                      Save
                    </Button>
                    <Button
                      type="primary"
                      size="small"
                      className="bg-blue-500 hover:bg-blue-700 rounded"
                      onClick={handleOk}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* </> */}
        </div>
      </Modal>
    </>
  );
};

export default EditUser;
