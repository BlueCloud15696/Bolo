import React, { useEffect, useState } from "react";
import * as Yup from "yup";

import { useFormik, Form, FormikProvider } from "formik";
// material
import {
  Stack,
  TextField,
  Select,
  OutlinedInput,
  FormControl,
  MenuItem,
  InputLabel,
  Button,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
//import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";
import { FileUploader } from "react-drag-drop-files";

export default function RegisterForm({
  addResult,
  setAddResult,
  onAddTeamSuccess,
  openModal,
  handleClose,
  teamMember,
}) {
  const RegisterSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Name is required"),
    ...(!(teamMember && teamMember.id) && {
      email: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Email is required"),
    }),
    phone: Yup.string()
      .min(6, "Enter valid phone number")
      .max(17, "Enter valid phone number!")
      .required("Phone Number is required"),
    password: Yup.string()
      .min(8, "Password must be greater than 8 characters!")
      .required("Password is required"),
    role: Yup.string().required("Role is required"),
  });
  const formik = useFormik({
    initialValues: {
      name: teamMember && teamMember.name ? teamMember.name : "",
      ...(!(teamMember && teamMember.id) && {
        email: teamMember && teamMember.email ? teamMember.email : "",
      }),
      phone: teamMember && teamMember.phone ? teamMember.phone : "",
      password: teamMember && teamMember.password ? teamMember.password : "",
      role: teamMember && teamMember.role ? teamMember.role : "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (finalValues, { setSubmitting }) => {
      teamMember && teamMember.id
        ? onEditDeveloper(finalValues, setSubmitting)
        : onAddDeveloper(finalValues, setSubmitting);
    },
  });
  const {
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    getFieldProps,
    setFieldValue,
    values,
  } = formik;

  const onAddDeveloper = (finalValues, setIsSubmitting) => {
    setAddResult({ state: "success", message: "" });
    setIsSubmitting(true);

    const formData = new FormData();

    formData.append("name", finalValues.name);
    formData.append("email", finalValues.email);
    formData.append("phone", finalValues.phone);
    formData.append("password", finalValues.password);
    formData.append("role", finalValues.role);

    axios
      .post(
        `${BASE_URL}/api/users/`,
        {
          name: finalValues.name,
          email: finalValues.email,
          phone: finalValues.phone,
          password: finalValues.password,
          role: finalValues.role,
        },
        {
          headers: {
            accessTokenBolo: localStorage.getItem("accessTokenBolo"),
          },
        }
      )
      .then((res) => {
        if (!res.data.error) {
          setAddResult({
            state: "success",
            message: "user added successfully!",
          });
          setIsSubmitting(false);
          onAddTeamSuccess();
        } else {
          setAddResult({
            state: "error",
            message:
              res.data.message || "Something went wrong while adding user!",
          });
          setIsSubmitting(false);
        }
      })
      .catch((error) => {
        setAddResult({
          state: "error",
          message: "Something went wrong while adding user!",
        });
        setIsSubmitting(false);
      });
  };

  const onEditDeveloper = (finalValues, setIsSubmitting) => {
    setAddResult({ state: "success", message: "" });
    setIsSubmitting(true);
    console.log("finalValues", finalValues);
    const formData = new FormData();

    formData.append("name", finalValues.name);
    //formData.append("email", finalValues.email);
    formData.append("phone", finalValues.phone);
    formData.append("password", finalValues.password);
    formData.append("role", finalValues.role);

    axios
      .patch(
        `${BASE_URL}/api/users/${teamMember.id}`,
        {
          name: finalValues.name,
          /* email: finalValues.email, */
          phone: finalValues.phone,
          password: finalValues.password,
          role: finalValues.role,
        },
        {
          headers: {
            accessTokenBolo: localStorage.getItem("accessTokenBolo"),
          },
        }
      )
      .then((res) => {
        if (!res.data.error) {
          setAddResult({
            state: "success",
            message: "user editted successfully!",
          });
          setIsSubmitting(false);
          onAddTeamSuccess();
        } else {
          setAddResult({
            state: "error",
            message:
              res.data.message || "Something went wrong while editted user!",
          });
          setIsSubmitting(false);
        }
      })
      .catch((error) => {
        setAddResult({
          state: "error",
          message: "Something went wrong while editted user!",
        });
        setIsSubmitting(false);
      });
  };
  let isDisabled = isSubmitting;

  useEffect(() => {
    setFieldValue("name", teamMember && teamMember.name ? teamMember.name : "");
    if (!(teamMember && teamMember.id)) {
      setFieldValue(
        "email",
        teamMember && teamMember.email ? teamMember.email : ""
      );
    }
    setFieldValue(
      "phone",
      teamMember && teamMember.phone ? teamMember.phone : ""
    );
    setFieldValue(
      "password",
      teamMember && teamMember.password ? teamMember.password : ""
    );
    setFieldValue("role", teamMember && teamMember.role ? teamMember.role : "");
  }, [teamMember]);

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate /* onSubmit={handleSubmit} */>
          <Dialog
            open={openModal}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {teamMember && teamMember.id ? "Edit User" : "Add User"}
            </DialogTitle>
            <DialogContent>
              <Stack spacing={3} sx={{ mt: 3 }}>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField
                    size="small"
                    fullWidth
                    label="User Name"
                    {...getFieldProps("name")}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                    disabled={isDisabled}
                  />
                  {!(teamMember && teamMember.id) && (
                    <TextField
                      size="small"
                      fullWidth
                      label="Email"
                      type="email"
                      {...getFieldProps("email")}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                      disabled={isDisabled}
                    />
                  )}
                </Stack>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Phone Number"
                    type="number"
                    {...getFieldProps("phone")}
                    error={Boolean(touched.phone && errors.phone)}
                    helperText={touched.phone && errors.phone}
                    disabled={isDisabled}
                  />
                  <TextField
                    size="small"
                    fullWidth
                    label="Default Password"
                    {...getFieldProps("password")}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                    disabled={isDisabled}
                  />
                </Stack>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                      size="small"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={values.role}
                      label="Role"
                      onChange={(event) =>
                        setFieldValue("role", event.target.value)
                      }
                    >
                      <MenuItem value={"ADMIN"}>Admin</MenuItem>
                      <MenuItem value={"USER"}>User</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
                {addResult.message && addResult.message !== "" && (
                  <Alert severity={addResult.state} variant="outlined">
                    {addResult.message}
                  </Alert>
                )}
              </Stack>
            </DialogContent>
            <DialogActions sx={{ mr: 3, mb: 3 }}>
              <Button onClick={handleClose} disabled={isDisabled}>
                Back
              </Button>
              <Button
                type="submit"
                variant="contained"                
                disabled={isDisabled}
                onClick={handleSubmit}
                autoFocus
              >
                {isSubmitting ? "Submiting" : "Submit"}
              </Button>
            </DialogActions>
          </Dialog>
        </Form>
      </FormikProvider>
    </>
  );
}
