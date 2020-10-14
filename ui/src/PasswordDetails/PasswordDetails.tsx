import React from "react";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import userService from "../UserService/UserService";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { AppContext } from "../AppContext/AppContext";
import Spinner from "react-bootstrap/Spinner";
import { BiArrowFromBottom } from "react-icons/bi";
import { BsExclamationCircle, BsCheck } from "react-icons/bs";
import { usePromise } from "react-use-promise-matcher";
import FormikInput from "../FormikInput/FormikInput";

interface PasswordDetailsParams {
  currentPassword: string;
  newPassword: string;
  repeatedPassword: string;
}

const ProfileDetails: React.FC = () => {
  const {
    state: { apiKey },
  } = React.useContext(AppContext);

  const validationSchema: Yup.ObjectSchema<PasswordDetailsParams | undefined> = Yup.object({
    currentPassword: Yup.string().min(3, "At least 3 characters required").required("Required"),
    newPassword: Yup.string().min(3, "At least 3 characters required").required("Required"),
    repeatedPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Required"),
  });

  const [result, send] = usePromise<{}, [PasswordDetailsParams], Error>(
    ({ currentPassword, newPassword }: PasswordDetailsParams) =>
      userService.changePassword(apiKey, { currentPassword, newPassword }).catch((error) => {
        throw new Error(error?.response?.data?.error || error.message);
      })
  );

  return (
    <Container className="py-5">
      <h3>Password details</h3>
      <Formik<PasswordDetailsParams>
        initialValues={{
          currentPassword: "",
          newPassword: "",
          repeatedPassword: "",
        }}
        onSubmit={send}
        validationSchema={validationSchema}
      >
        <Form as={FormikForm}>
          <FormikInput name="currentPassword" label="Current password" type="password" />
          <FormikInput name="password" label="New password" type="password" />
          <FormikInput name="repeatedPassword" label="Repeat new password" type="password" />

          <Button type="submit">
            <BiArrowFromBottom />
            &nbsp;Update password
          </Button>
          {result.match({
            Idle: () => <></>,
            Loading: () => (
              <Form.Text muted>
                <Spinner as="span" className="mr-2" animation="border" size="sm" role="loader" />
                Connecting
              </Form.Text>
            ),
            Rejected: (error) => (
              <Form.Text className="text-danger">
                <BsExclamationCircle className="mr-2" />
                {error.toString()}
              </Form.Text>
            ),
            Resolved: () => (
              <Form.Text className="text-success">
                <BsCheck className="mr-2" />
                Password update success.
              </Form.Text>
            ),
          })}
        </Form>
      </Formik>
    </Container>
  );
};

export default ProfileDetails;
