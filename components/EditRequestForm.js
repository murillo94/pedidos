/* eslint-disable jsx-a11y/label-has-for */

const Label = ({ text, id, children }) => (
  <div>
    <label htmlFor={id}>{text}</label>
    {children}

    <style jsx>
      {`
        div {
          margin-bottom: 15px;
        }

        label {
          font-size: 15px;
          font-weight: 500;
          display: block;
          margin-bottom: 7px;
        }
      `}
    </style>
  </div>
);

const EditRequestForm = () => {
  return (
    <div className="content">
      <Label text="Cliente" id="male" />

      <style jsx>
        {`
          .content {
            flex-grow: 1;
            padding: 20px;
            overflow: auto;
          }
        `}
      </style>
    </div>
  );
};

export default EditRequestForm;
