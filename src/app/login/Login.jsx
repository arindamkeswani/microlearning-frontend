import React, { createRef, useEffect, useRef, useState } from "react";
import { Carousel, TextInput } from "flowbite-react";
import { debounce } from "../../utils";
import Button from "../../lib/Button/Button";

const inputRefs = [1, 2, 3, 4, 5, 6].map(() => createRef(null));

const Login = () => {
  const [timer, setTimer] = useState(30);
  const [isValidNumber, setIsValidNumber] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isNumberSaved, setIsNumberSaved] = useState(false);
  const [optArray, setOtpArray] = useState(["", "", "", "", "", ""]);

  const handleInputChange = (index, value) => {
    optArray[index] = value;
    setOtpArray([...optArray]);
    if (index < inputRefs.length - 1 && value) {
      inputRefs[index + 1].current.focus();
    }
  };

  useEffect(() => {
    let interval;

    if (timer > 0 && isNumberSaved) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timer, isNumberSaved]);

  const handleInputKeyDown = (event, index) => {
    if (
      index > 0 &&
      (event.key === "ArrowLeft" ||
        (event.key === "Backspace" && inputRefs[index].current.value === ""))
    ) {
      setTimeout(() => inputRefs[index - 1].current.focus(), 10);
    }
    if (event.key === "ArrowRight") {
      if (index < inputRefs.length - 1) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleInputFocus = (index) => {
    const inputRef = inputRefs[index].current;
    if (inputRef) {
      inputRef.select();
    }
  };

  return (
    <div className="flex w-[60vw] m-auto h-[80vh] ">
      <div className="w-1/2" style={{ boxShadow: "0 0 10px #00000029" }}>
        <Carousel leftControl=" " rightControl=" " indicators={false}>
          <img alt="..." src="/login_carousal.png" />
          <img alt="..." src="/login_carousal1.png" />
          <img alt="..." src="login_carousal2.png" />
        </Carousel>
      </div>
      <div
        className="flex flex-col w-1/2 justify-center items-center bg-[#fff]  "
        style={{ boxShadow: "0 0 10px #00000029" }}
      >
        {!isNumberSaved ? (
          <div>
            <div className="mt-2 mb-4 text-center">
              <img
                src="/pw_logo.jpeg"
                className="w-[76px] h-[76px] border-1 rounded-[15px] m-auto "
              />
            </div>
            <div className="mt-2 mb-1 ">
              {" "}
              <h5 className="text-center font-light text-[24px]">Welcome To</h5>
            </div>
            <div>
              <h3 className="text-center text-[30px] font-bold">
                Physics Wallah
              </h3>
            </div>
            <div className="mt-10 mb-1">
              <p className="text-center enter-mobile-text body-1 text-[16px] text-[#333] ">
                Please enter your mobile number to Login/Register
              </p>
            </div>
            <div className="my-8">
              <TextInput
                addon="+91"
                id="tel"
                placeholder="Enter Mobile No."
                // className="focus:border-gray-50"
                onChange={(e) => {
                  const phoneNumber = e.target.value;
                  debounce(() => {
                    setPhoneNumber(phoneNumber);
                    setIsValidNumber(
                      phoneNumber.length === 10 && /^\d+$/.test(phoneNumber)
                    );
                  }, 300)();
                  setPhoneNumber();
                }}
                required
                {...(isValidNumber
                  ? { color: "danger" }
                  : {
                      color: "failure",
                      helperText: (
                        <p className="pl-12">
                          Please Enter Correct Phone Number
                        </p>
                      ),
                    })}
                type="tel"
                sizing="lg"
              />
              {isValidNumber && <div className="h-7"></div>}
            </div>
            <div className="justify-center m-auto">
              <Button
                disabled={!isValidNumber || !phoneNumber}
                className="rou rounded-[25px] p-[15px] w-[90%] m-auto mb-5 disabled:bg-[#B4B4B4] disabled:text-[#fff] border-0 bg-[#5a4bda] text-xl"
                style={{ boxShadow: "0 7px 11px #5315cf38" }}
                onClick={() => setIsNumberSaved(true)}
              >
                GET OTP
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mt-2 mb-4 text-center">
              <img
                src="/pw_logo.jpeg"
                className="w-[76px] h-[76px] border-1 rounded-[15px] m-auto "
              />
            </div>
            <div class="flex flex-col items-center justify-center mt-5">
              <h2 class="font-[700] text-[30px]">Verification</h2>
              <h2 class="font-[500] text-[16px]">
                Enter the code sent to your phone
              </h2>
              <div class="flex items-start">
                <h4 class="font-[700] text-[20px]">(+91) {phoneNumber}</h4>
                <img
                  id="edit-phone"
                  className="edit-img ml-4 cursor-pointer w-[25px] h-fit "
                  src="/edit.png"
                ></img>
              </div>
            </div>
            <div className="flex gap-2 mt-10">
              {[1, 2, 3, 4, 5, 6].map((number, index) => (
                <TextInput
                  className="w-[35px] h-[35px]"
                  maxLength={1}
                  inputMode="numeric"
                  type="text"
                  color="danger"
                  key={number}
                  ref={inputRefs[index]}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleInputChange(index, e.target.value);
                  }}
                  onFocus={() => handleInputFocus(index)}
                  onKeyDown={(e) => {
                    e.stopPropagation();
                    handleInputKeyDown(e, index);
                  }}
                />
              ))}
            </div>
            <div className="justify-center m-auto mt-10">
              <Button
                disabled={optArray.join("").length !== 6}
                className="rou rounded-[25px] p-[12px] w-[100%] m-auto mb-5 disabled:bg-[#B4B4B4] disabled:text-[#fff] border-0 bg-[#5a4bda] text-xl"
                style={{ boxShadow: "0 7px 11px #5315cf38" }}
              >
                CONTINUE
              </Button>
            </div>
            {!!timer ? (
              <div className="text-[17px] font-[700] m-auto text-center">
                {timer}s
              </div>
            ) : (
              <div className="justify-center m-auto mt-10">
                <Button
                  className="rounded-[25px] p-[12px] w-[55%] m-auto mb-5 disabled:bg-[#B4B4B4] disabled:text-[#fff] border-0 bg-[#5a4bda] text-lg"
                  style={{ boxShadow: "0 7px 11px #5315cf38" }}
                  onClick={() => setTimer(30)}
                >
                  Resend OTP
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
