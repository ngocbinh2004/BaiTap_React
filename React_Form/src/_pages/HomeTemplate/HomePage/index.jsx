import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addStudent, updateStudent } from "./duck/reducer";
import "./index.scss";

const HomePage = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.student.listStudent);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudents, setFilteredStudents] = useState(students);

  useEffect(() => {
    setFilteredStudents(
      students.filter((student) =>
        student.hoTen.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, students]);

  const formik = useFormik({
    initialValues: {
      maSV: "",
      hoTen: "",
      soDT: "",
      email: "",
    },
    validationSchema: Yup.object({
      maSV: Yup.string().required("Mã SV không được để trống"),
      hoTen: Yup.string().required("Họ tên không được để trống"),
      soDT: Yup.string().required("Số điện thoại không được để trống"),
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Email không được để trống"),
    }),
    onSubmit: (values) => {
      if (editingStudent) {
        dispatch(updateStudent({ ...values, id: editingStudent.id }));
        setEditingStudent(null);
      } else {
        dispatch(addStudent({ ...values, id: Date.now() }));
      }
      formik.resetForm();
    },
  });

  const handleEdit = (student) => {
    setEditingStudent(student);
    formik.setValues(student);
  };

  return (
    <div className="container">
      <h2 className="title">Thông tin sinh viên</h2>

      <input
        type="text"
        placeholder="Tìm kiếm sinh viên theo họ tên..."
        className="search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <form onSubmit={formik.handleSubmit} className="student-form">
        <div className="form-group">
          <label>Mã SV</label>
          <input
            type="text"
            name="maSV"
            value={formik.values.maSV}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`form-control ${
              formik.touched.maSV && formik.errors.maSV ? "is-invalid" : ""
            }`}
          />
          {formik.touched.maSV && formik.errors.maSV && (
            <span className="error">{formik.errors.maSV}</span>
          )}
        </div>
        <div className="form-group">
          <label>Họ tên</label>
          <input
            type="text"
            name="hoTen"
            value={formik.values.hoTen}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`form-control ${
              formik.touched.hoTen && formik.errors.hoTen ? "is-invalid" : ""
            }`}
          />
          {formik.touched.hoTen && formik.errors.hoTen && (
            <span className="error">{formik.errors.hoTen}</span>
          )}
        </div>
        <div className="form-group">
          <label>Số điện thoại</label>
          <input
            type="text"
            name="soDT"
            value={formik.values.soDT}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`form-control ${
              formik.touched.soDT && formik.errors.soDT ? "is-invalid" : ""
            }`}
          />
          {formik.touched.soDT && formik.errors.soDT && (
            <span className="error">{formik.errors.soDT}</span>
          )}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`form-control ${
              formik.touched.email && formik.errors.email ? "is-invalid" : ""
            }`}
          />
          {formik.touched.email && formik.errors.email && (
            <span className="error">{formik.errors.email}</span>
          )}
        </div>
        <button type="submit" className="btn btn-success">
          {editingStudent ? "Cập nhật" : "Thêm sinh viên"}
        </button>
      </form>

      <table className="student-table">
        <thead>
          <tr>
            <th>Mã SV</th>
            <th>Họ tên</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.maSV}</td>
              <td>{student.hoTen}</td>
              <td>{student.soDT}</td>
              <td>{student.email}</td>
              <td>
                <button
                  className="btn btn-edit"
                  onClick={() => handleEdit(student)}
                >
                  Sửa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;
