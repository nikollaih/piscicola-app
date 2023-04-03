import { useContext } from "react";
import { FormContext } from "../context/FormContext";
export const useForm = () => {
    return useContext(FormContext);
};