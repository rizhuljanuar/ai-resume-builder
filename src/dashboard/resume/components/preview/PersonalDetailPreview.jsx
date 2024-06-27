import React from 'react'

function PersonalDetailPreview({resumeInfo}) {
  return (
    <div>
      <h2 className="font-bold text-xl text-center"
        style={{
          color: resumeInfo?.themeColor
        }}
      >
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h2>
      <h2 className="text-center text-sm font-medium">
        {resumeInfo?.jobTitle}
      </h2>
      <h2 className="text-center font-normal text-xs"></h2>
    </div>
  )
}

export default PersonalDetailPreview
