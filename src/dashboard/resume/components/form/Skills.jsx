import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Rating } from '@smastrom/react-rating';
import { Button } from '@/components/ui/button';

import '@smastrom/react-rating/style.css';
import { LoaderCircle } from 'lucide-react';

function Skills() {
  const [skillList, setSkillList] = useState([
    {
      name: '',
      rating: 0,
    }
  ]);

  const {resumeId} = useParams();
  const [loading, setLoading] = useState(false);
  const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);

  useEffect(() => {
    resumeInfo && setSkillList(resumeInfo?.skills);
  }, []);

  const handleChange = (index, name, value) => {
    const newEntries = skillList.slice();

    newEntries[index][name] = value;
    setSkillList(newEntries);
  }

  const AddNewSkills = () => {
    setSkillList([...skillList, 
      {
        name: '',
        rating: 0,
      }
    ]);
  }

  const RemoveSkills = () => {
    setSkillList(skillList => skillList.slice(0, -1));
  }

  const onSave = () => {
    setLoading(true);

    const data = {
      data: {
        skills: skillList.map(({ id, ...rest }) => rest),
      }
    }

    GlobalApi.UpdateResumeDetail(resumeId, data)
    .then(res => {
        console.log(res);
        setLoading(false);
        toast('Details updated !');
      }, (error) => {
        setLoading(false);
          toast('Server error, Try again!');
      })
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      skills: skillList
    })
  }, [skillList]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Skills</h2>
      <p>Add your top professional key skills</p>

      <div>
        {skillList.map((item, index) => (
          <div key={index} className="flex justify-between mb-2 border rounded-lg p-3">
            <div>
              <label className="text-xs">Name</label>
              <Input 
                className="w-full"
                defaultValue={item.name}
                onChange={(e) => handleChange(index, 'name', e.target.value)}
              />
            </div>

            <Rating 
              style={{ maxWidth: 120 }} 
              value={item.rating} 
              onChange={(value) => handleChange(index, 'rating', value)}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={AddNewSkills}
            className="text-primary"
          >
            + Add More Skill
          </Button>
          <Button 
            variant="outline"
            onClick={RemoveSkills}
            className="text-primary"
          >
            - Remove
          </Button>
        </div>

        <Button
          disabled={loading}
          onClick={() => onSave()}
        >
          {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
        </Button>
      </div>
    </div>
  )
}

export default Skills
