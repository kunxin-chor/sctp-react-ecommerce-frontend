import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useLocation } from 'wouter';
import { useFlashMessage } from './FlashMessageStore';

function RegisterPage() {

  const [, setLocation] = useLocation();
  const {showMessage} = useFlashMessage();

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    salutation: '',
    marketingPreferences: [],
    country: ''
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    salutation: Yup.string()
      .required('Salutation is required'),
    country: Yup.string()
      .required('Country is required')
  });

  const handleSubmit = async (values, formikHelpers) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/register`, values);
      console.log('Registration successful:', response.data);
      // show success message
      showMessage('Registration successful!', 'success');
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
      // show error message
      showMessage(error.response?.data || error.message, 'danger');
    } finally {
      formikHelpers.setSubmitting(false);
      // redirect to the home page after registration using wouter, and pass the message
     setLocation('/');
    }
  };

  return (
    <div className="container mt-5">
      <h1>Register</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <Field
                type="text"
                className="form-control"
                id="name"
                name="name"
              />
              {/* Show validation error for name, if any */}
              {formik.touched.name && formik.errors.name ? <div className="text-danger">{formik.errors.name}</div> : null}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <Field
                type="email"
                className="form-control"
                id="email"
                name="email"
              />
              {/* Show validation error for email, if any */}
              {formik.touched.email && formik.errors.email ? <div className="text-danger">{formik.errors.email}</div> : null}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <Field
                type="password"
                className="form-control"
                id="password"
                name="password"
              />
              {/* Show validation error for password, if any */}
              {formik.touched.password && formik.errors.password ? <div className="text-danger">{formik.errors.password}</div> : null}
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <Field
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
              />
              {/* Show validation error for confirmPassword, if any */}
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? <div className="text-danger">{formik.errors.confirmPassword}</div> : null}
            </div>

            <div className="mb-3">
              <label className="form-label">Salutation</label>
              <div>
                <div className="form-check form-check-inline">
                  <Field
                    className="form-check-input"
                    type="radio"
                    name="salutation"
                    id="mr"
                    value="Mr"
                  />
                  <label className="form-check-label" htmlFor="mr">Mr</label>
                </div>
                <div className="form-check form-check-inline">
                  <Field
                    className="form-check-input"
                    type="radio"
                    name="salutation"
                    id="ms"
                    value="Ms"
                  />
                  <label className="form-check-label" htmlFor="ms">Ms</label>
                </div>
                <div className="form-check form-check-inline">
                  <Field
                    className="form-check-input"
                    type="radio"
                    name="salutation"
                    id="mrs"
                    value="Mrs"
                  />
                  <label className="form-check-label" htmlFor="mrs">Mrs</label>
                </div>
              </div>
              {/* Show validation error for salutation, if any */}
              {formik.touched.salutation && formik.errors.salutation ? <div className="text-danger">{formik.errors.salutation}</div> : null}
            </div>

            <div className="mb-3">
              <label className="form-label">Marketing Preferences</label>
              <div role="group" aria-labelledby="checkbox-group">
                <div className="form-check">
                  <Field
                    className="form-check-input"
                    type="checkbox"
                    id="emailMarketing"
                    name="marketingPreferences"
                    value="email"
                  />
                  <label className="form-check-label" htmlFor="emailMarketing">
                    Email Marketing
                  </label>
                </div>
                <div className="form-check">
                  <Field
                    className="form-check-input"
                    type="checkbox"
                    id="smsMarketing"
                    name="marketingPreferences"
                    value="sms"
                  />
                  <label className="form-check-label" htmlFor="smsMarketing">
                    SMS Marketing
                  </label>
                </div>
              </div>
              {/* Show validation error for marketing preferences, if any */}
              {formik.touched.marketingPreferences && formik.errors.marketingPreferences ? <div className="text-danger">{formik.errors.marketingPreferences}</div> : null}
            </div>

            <div className="mb-3">
              <label htmlFor="country" className="form-label">Country</label>
              <Field
                as="select"
                className="form-select"
                id="country"
                name="country"
              >
                <option value="">Select Country</option>
                <option value="sg">Singapore</option>
                <option value="my">Malaysia</option>
                <option value="in">Indonesia</option>
                <option value="th">Thailand</option>
              </Field>
              {/* Show validation error for country, if any */}
              {formik.touched.country && formik.errors.country ? <div className="text-danger">{formik.errors.country}</div> : null}
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={formik.isSubmitting}
            >
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default RegisterPage;