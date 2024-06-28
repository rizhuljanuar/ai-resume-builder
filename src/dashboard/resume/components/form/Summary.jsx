import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from 'sonner';
import { Brain, LoaderCircle } from 'lucide-react';
import { AIChatSession } from './../../../../../service/AIModal';


const prompt="Job Title: {jobTitle} , Depends on job title give me list of  summery for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format";
function Summary({enableNext}) {
  const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);
  const [summary, setSummary] = useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState();

  useEffect(() => {
    summary && setResumeInfo({
      ...resumeInfo,
      summary: summary
    })
  }, [summary]);

  const GenerateSummaryFromAI = async () => {
    setLoading(true);
    const PROMT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle);
    console.log(PROMT)
    const result = await AIChatSession.sendMessage(PROMT);

    console.log(result.response.text())
    setAiGeneratedSummaryList(JSON.parse(result.response.text()));
    setLoading(false);
  }

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
              onClick={() => GenerateSummaryFromAI()}
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

      {aiGeneratedSummaryList && 
        <div className="my-5">
          <h2 className="font-bold text-lg">Suggestions</h2>
          {aiGeneratedSummaryList.map((item, index) => (
            <div 
              key={index}
              onClick={() => setSummary(item?.summary)}
              className="p-5 shadow-lg my-4 rounded-lg cursor-pointer"
            >
              <h2 className="font-bold my-1 text-primary">Level: {item?.experienceLevel}</h2>
              <p>{item.summary}</p>
            </div>
          ))};
        </div>
      }
    </div>
  )
}

export default Summary
