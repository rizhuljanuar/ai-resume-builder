import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from 'sonner';
import { Brain, LoaderCircle } from 'lucide-react';

function Summary({enableNext}) {
  const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);
  const [summary, setSummary] = useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    summary && setResumeInfo({
      ...resumeInfo,
      summary: summary
    })
  }, [summary]);

  const onSave = (e) => {
    e.preventDefault();

    setLoading(true);

    const data = {
      data: {
        summary: summary
      } 
    };

    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then((res) => {
      console.log(res);

      enableNext(true);
      setLoading(false);
      toast("Detail updated");
    }, (error) => {
      setLoading(false);
    });

    enableNext(true);


  }

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">
          Summary
        </h2>
        <p>
          Add Summary for your job title
        </p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add Summary</label>
            <Button 
              variant="outline" 
              type="button"
              size="sm" 
              className="border-primary text-primary flex gap-2"
            >
              <Brain className="w-4 h-4" /> Generate from AI
            </Button>
          </div>

          <Textarea 
            className="mt-5" 
            required
            onChange={(e) => setSummary(e.target.value)}
          />

          <div className="mt-2 flex justify-end">
            <Button disabled={loading} type="submit">
              {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Summary
