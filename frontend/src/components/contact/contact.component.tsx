import React, { FormEvent } from "react";
import ButtonCustom from "../../common/buttonCustom/buttonCustom.component";
import {
  ValidationResult,
  validateContactMessage,
} from "../../common/utils/validator.utils";
import { useApiClient } from "../../providers/api/apiContext.hook";
import { sendaTicketRest } from "./contact.service";

const Contact: React.FC = () => {
  const [isButtonsDisabled, setIsButtonsDisabled] =
    React.useState<boolean>(true);
  const [message, setMessage] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [errorInForm, setErrorInForm] = React.useState<string[]>([]);
  const [resultMessage, setResultMessage] = React.useState<string>("");
  const { apiClient } = useApiClient();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await sendaTicketRest(apiClient, {
      email: email,
      content: message,
    });
    if (result === 201) {
      setResultMessage("Message sent");
    }
  };

  const handleFormChange = () => {
    const result: ValidationResult = validateContactMessage(email, message);
    if (result.isValid) {
      setIsButtonsDisabled(false);
      setErrorInForm([]);
    } else {
      setIsButtonsDisabled(true);
      setErrorInForm(
        result.errors && result.errors.length > 0
          ? result.errors
          : ["Unknown error"]
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <form onChange={handleFormChange}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              E-mail
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder={"Enter your email"}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              placeholder="Enter your message"
              rows={4}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          {errorInForm && (
            <>
              {errorInForm.map((error: string, index: number) => (
                <p key={index} className="text-red-500 text-xs italic">
                  {error}
                </p>
              ))}
            </>
          )}
          {resultMessage && (
            <p className="text-green-500 text-xs italic">{resultMessage}</p>
          )}
          <div className="flex items-center justify-between">
            <ButtonCustom
              type="login"
              onClick={handleSubmit}
              disabled={isButtonsDisabled}
            >
              Send
            </ButtonCustom>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
