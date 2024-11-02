import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import { getCurrentCourseProgressService } from "@/services";
import { ChevronLeft } from "lucide-react";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


function StudentViewCourseProgressPage(){

    const navigate = useNavigate()
    const {auth} = useContext(AuthContext);
    const {studentCurrentCourseProgress, setStudentCurrentCourseProgress} = useContext(StudentContext);

    const {id} = useParams()


    async function fetchCurrentCourseProgress(){
        const response = await getCurrentCourseProgressService(auth?.user?._id, id);
        console.log(response, 'response');

    }

    useEffect(()=>{
        fetchCurrentCourseProgress();

    },[id])
    

    return <div className="flex flex-col h-screen bg-[#1c1d1f] text-white">
        <div className="flex items-center justify-between p-4 bg-[#1c1d1f] border-b border-gray-700">
            <div className="flex items-center space-x-4">
                <Button onClick={()=>navigate('/student-courses')} className="text-black" variant="ghost" size="sm">
                    <ChevronLeft className="h-4 w-4 mr-2"/>
                    You need to buy this course in order to continue...
                </Button>
            </div>

        </div>
    </div>

}

export default StudentViewCourseProgressPage;