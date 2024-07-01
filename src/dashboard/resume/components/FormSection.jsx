import React, { useState } from 'react'
import PersonalDetail from './form/PersonalDetail'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react'
import Summary from './form/Summary';
import Experience from './form/Experience';
import Education from './form/Education';
import Skills from './form/Skills';

function FormSection() {
  const [activeFromIndex, setActiveFromIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center">
        <Button variant="outline" size="sm" className="flex gap-2">
          <LayoutGrid /> Theme
        </Button>
        <div className="flex gap-2">
          {activeFromIndex > 1 && 
            <Button size="sm" onClick={() => setActiveFromIndex(activeFromIndex - 1)}> 
              <ArrowLeft /> 
            </Button>
          }
          <Button 
            disabled={!enableNext}
            className="flex gap-2" 
            size="sm"
            onClick={() => setActiveFromIndex(activeFromIndex + 1)}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>
      {/* Personal Detail */}
      { activeFromIndex === 1 ? <PersonalDetail enableNext={(v) => setEnableNext(v)} /> :
        activeFromIndex === 2 ? <Summary enableNext={(v) => setEnableNext(v)} /> : 
        activeFromIndex === 3 ? <Experience /> : 
        activeFromIndex === 4 ? <Education /> : 
        activeFromIndex === 5 ? <Skills /> : null
      }

      {/* Summary */}

      {/* Experience */}

      {/* Educational Detail */}

      {/* Skills */}
    </div>
  )
}

export default FormSection
