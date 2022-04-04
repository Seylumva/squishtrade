const FormImageInput = ({ handleAddImage }) => {
  return (
    <div>
      <label
        htmlFor="avatar"
        className="btn btn-outline btn-primary btn-sm w-full mt-3"
      >
        Upload
      </label>
      <input
        type="file"
        className="hidden mt-auto"
        name="avatar"
        id="avatar"
        onChange={handleAddImage}
        multiple
      />
    </div>
  );
};

export default FormImageInput;
