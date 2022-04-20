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
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";
import { FileUploader } from "react-drag-drop-files";

// ----------------------------------------------------------------------

const fileTypes = ["JPEG", "PNG", "GIF", "jpg", "pdf", "PDF"];

export default function RegisterForm({
  addResult,
  setAddResult,
  onAddTeamSuccess,
  openModal,
  handleClose,
  teamMember,
}) {
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };

  const RegisterSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Name is required"),
    profession: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Profession is required"),
    rating: Yup.string()
      .min(0, "Enter number between 0 and 5!")
      .max(5, "Enter number between 0 and 5!")
      .required("Rating is required"),
    numJob: Yup.string()
      .min(0, "Number of Job must be positive number!")
      .required("Number of Job is required"),
    description: Yup.string()
      .min(2, "Too Short!")
      .max(5000, "Too Long!")
      .required("Description is required"),
    languages: Yup.array().required("Languages is required"),
    experienceYear: Yup.string()
      .min(0, "Experience Years must be positive number!")
      .required("erience Years is required"),
    rate: Yup.string()
      .min(0, "Hourly rate must be positive number!")
      .required("Hourly rate is required"),
  });
  const formik = useFormik({
    initialValues: {
      name: teamMember && teamMember.name ? teamMember.name : "",
      profession:
        teamMember && teamMember.profession ? teamMember.profession : "",
      rating: teamMember && teamMember.rating ? teamMember.rating : "",
      numJob: teamMember && teamMember.numJob ? teamMember.numJob : "",
      description:
        teamMember && teamMember.description ? teamMember.description : "",
      languages: teamMember && teamMember.languages ? teamMember.languages : [],
      experienceYear:
        teamMember && teamMember.experienceYear
          ? teamMember.experienceYear
          : "",
      rate: teamMember && teamMember.rate ? teamMember.rate : "",
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
    if (file) {
      const formData = new FormData();

      formData.append(`avatar`, file[0]);
      formData.append("name", finalValues.name);
      formData.append("profession", finalValues.profession);
      formData.append("rating", finalValues.rating);
      formData.append("numJob", finalValues.numJob);
      formData.append("description", finalValues.description);
      finalValues.languages.map((language) => {
        formData.append("languages", language);
        return true;
      });
      formData.append("experienceYear", finalValues.experienceYear);
      formData.append("rate", finalValues.rate);

      axios
        .post(`${BASE_URL}/api/developers/`, formData, {
          headers: {
            accessTokenBolo: localStorage.getItem("accessTokenBolo"),
          },
        })
        .then((res) => {
          if (!res.data.error) {
            setAddResult({
              state: "success",
              message: "developer added successfully!",
            });
            setIsSubmitting(false);
            onAddTeamSuccess();
          } else {
            setAddResult({
              state: "error",
              message:
                res.data.message ||
                "Something went wrong while adding developer!",
            });
            setIsSubmitting(false);
          }
        })
        .catch((error) => {
          setAddResult({
            state: "error",
            message: "Something went wrong while adding developer!",
          });
          setIsSubmitting(false);
        });
    } else {
      setAddResult({
        state: "error",
        message: "Please add developer image!",
      });
      setIsSubmitting(false);
    }
  };

  const onEditDeveloper = (finalValues, setIsSubmitting) => {
    setAddResult({ state: "success", message: "" });
    setIsSubmitting(true);
    console.log("finalValues", finalValues);
    const formData = new FormData();

    if (file && file[0]) {
      formData.append(`avatar`, file[0]);
    }
    formData.append("name", finalValues.name);
    formData.append("profession", finalValues.profession);
    formData.append("rating", finalValues.rating);
    formData.append("numJob", finalValues.numJob);
    formData.append("description", finalValues.description);
    finalValues.languages.map((language) => {
      formData.append("languages", language);
      return true;
    });
    formData.append("experienceYear", finalValues.experienceYear);
    formData.append("rate", finalValues.rate);

    axios
      .patch(`${BASE_URL}/api/developers/${teamMember.id}`, formData, {
        headers: {
          accessTokenBolo: localStorage.getItem("accessTokenBolo"),
        },
      })
      .then((res) => {
        if (!res.data.error) {
          setAddResult({
            state: "success",
            message: "developer editted successfully!",
          });
          setIsSubmitting(false);
          onAddTeamSuccess();
        } else {
          setAddResult({
            state: "error",
            message:
              res.data.message ||
              "Something went wrong while editted developer!",
          });
          setIsSubmitting(false);
        }
      })
      .catch((error) => {
        setAddResult({
          state: "error",
          message: "Something went wrong while editted developer!",
        });
        setIsSubmitting(false);
      });
  };
  let isDisabled = isSubmitting;

  useEffect(() => {
    setFieldValue("name", teamMember && teamMember.name ? teamMember.name : "");
    setFieldValue(
      "profession",
      teamMember && teamMember.profession ? teamMember.profession : ""
    );
    setFieldValue(
      "rating",
      teamMember && teamMember.rating ? teamMember.rating : ""
    );
    setFieldValue(
      "numJob",
      teamMember && teamMember.numJob ? teamMember.numJob : ""
    );
    setFieldValue(
      "description",
      teamMember && teamMember.description ? teamMember.description : ""
    );
    setFieldValue(
      "languages",
      teamMember && teamMember.languages ? teamMember.languages : []
    );
    setFieldValue(
      "experienceYear",
      teamMember && teamMember.experienceYear ? teamMember.experienceYear : ""
    );
    setFieldValue("rate", teamMember && teamMember.rate ? teamMember.rate : "");
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
              {teamMember && teamMember.id ? "Edit Developer" : "Add Developer"}
            </DialogTitle>
            <DialogContent>
              <Stack spacing={3} sx={{ mt: 3 }}>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Developer Name"
                    {...getFieldProps("name")}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                    disabled={isDisabled}
                  />
                  <TextField
                    size="small"
                    fullWidth
                    label="Profession"
                    {...getFieldProps("profession")}
                    error={Boolean(touched.profession && errors.profession)}
                    helperText={touched.profession && errors.profession}
                    disabled={isDisabled}
                  />
                </Stack>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Rating (out of 5)"
                    type="number"
                    {...getFieldProps("rating")}
                    error={Boolean(touched.rating && errors.rating)}
                    helperText={touched.rating && errors.rating}
                    disabled={isDisabled}
                  />
                  <TextField
                    size="small"
                    fullWidth
                    label="Number of jobs"
                    type="number"
                    {...getFieldProps("numJob")}
                    error={Boolean(touched.numJob && errors.numJob)}
                    helperText={touched.numJob && errors.numJob}
                    disabled={isDisabled}
                  />
                </Stack>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Years of experience"
                    type="number"
                    {...getFieldProps("experienceYear")}
                    error={Boolean(
                      touched.experienceYear && errors.experienceYear
                    )}
                    helperText={touched.experienceYear && errors.experienceYear}
                    disabled={isDisabled}
                  />
                  <TextField
                    size="small"
                    fullWidth
                    label="Hourly rate"
                    type="number"
                    {...getFieldProps("rate")}
                    error={Boolean(touched.rate && errors.rate)}
                    helperText={touched.rate && errors.rate}
                    disabled={isDisabled}
                  />
                </Stack>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Description"
                    {...getFieldProps("description")}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                    disabled={isDisabled}
                  />
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Languages
                    </InputLabel>
                    <Select
                      size="small"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={values.languages}
                      label="Languages"
                      multiple
                      input={<OutlinedInput label="Name" />}
                      onChange={(event) =>
                        setFieldValue(
                          "languages",
                          typeof event.target.value === "string"
                            ? event.target.value.split(",")
                            : event.target.value
                        )
                      }
                    >
                      <MenuItem value={"Javascript"}>Javascript</MenuItem>
                      <MenuItem value={"Php"}>Php</MenuItem>
                      <MenuItem value={"Vue Js"}>Vue Js</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>

                <FileUploader
                  multiple={true}
                  handleChange={handleChange}
                  name="file"
                  types={fileTypes}
                  //multiple={true}
                  label="Drop developer profile image here"
                />

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
