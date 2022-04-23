import { motion } from "framer-motion";
import { useState } from "react";
import { EnumFormType, FormTypeProps } from "../utils/types";
import { equalsEnumFormType } from "../utils/utils";
import FormInput from "./FormInput";

export default function Form({ formType }: FormTypeProps) {

    const [formEnum, setFormEnum] = useState(formType);

    function changeVision(formType: EnumFormType) {
        setFormEnum(formType);
    }

    return (
        <div className="animate-fade-up">
            {equalsEnumFormType(formEnum, EnumFormType.LOGIN) &&
                <motion.div
                    initial={{ rotateY: equalsEnumFormType(formEnum, EnumFormType.LOGIN) ? 360 : 0 }}
                    animate={{ rotateY: equalsEnumFormType(formEnum, EnumFormType.LOGIN) ? 0 : 360 }}
                    transition={{ duration: 0.500 }}
                    className={`flex flex-col items-center px-4 py-8 bg-opacity-90 bg-white
                        rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10`}
                >
                    <FormInput formType={formEnum} changeFunction={changeVision} />
                </motion.div>
            }
            {equalsEnumFormType(formEnum, EnumFormType.REGISTER) &&
                <motion.div
                    initial={{ rotateY: equalsEnumFormType(formEnum, EnumFormType.REGISTER) ? 360 : 0 }}
                    animate={{ rotateY: equalsEnumFormType(formEnum, EnumFormType.REGISTER) ? 0 : 360 }}
                    transition={{ duration: 0.500 }}
                    className={`flex flex-col items-center px-4 py-8 bg-opacity-90 bg-white
                        rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10`}
                >
                    <FormInput formType={formEnum} changeFunction={changeVision} />
                </motion.div>
            }
            {equalsEnumFormType(formEnum, EnumFormType.FORGOT_PASSWORD) &&
                <motion.div
                    initial={{ rotateY: equalsEnumFormType(formEnum, EnumFormType.FORGOT_PASSWORD) ? 360 : 0 }}
                    animate={{ rotateY: equalsEnumFormType(formEnum, EnumFormType.FORGOT_PASSWORD) ? 0 : 360 }}
                    transition={{ duration: 0.500 }}
                    className={`flex flex-col items-center px-4 py-8 bg-opacity-90 bg-white
                        rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10`}
                >
                    <FormInput formType={formEnum} changeFunction={changeVision} />
                </motion.div>
            }
        </div>
    );
}