import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import { getCurrentCourseProgressService } from "@/services";
import { ChevronLeft } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


function StudentViewCourseProgressPage(){

    const navigate = useNavigate()
    const {auth} = useContext(AuthContext);
    const {studentCurrentCourseProgress, setStudentCurrentCourseProgress} = useContext(StudentContext);

    const [lockCourse, setLockCourse] = useState(false);
    const [currentLecture, setCurrentLecture] = useState(null);
    const [showCourseCompleteDialog, setShowCourseCompleteDialog] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    const {id} = useParams()


    async function fetchCurrentCourseProgress(){
        const response = await getCurrentCourseProgressService(auth?.user?._id, id);
        console.log(response, 'response');

        if(response?.success){
            if(!response?.data?.isPurchased){
                console.log(isPurchased);
                setLockCourse(true);
            } else{
                setStudentCurrentCourseProgress({
                    courseDetails : response?.data?.courseDetails,
                    progress : response?.data?.progress
                });
            }

            if(response?.data?.completed){
                setCurrentLecture(response?.data?.courseDetails?.curriculum[0]);
                setShowCourseCompleteDialog(true);
                setShowConfetti(true);

                return;

            }
        }

    }

    useEffect(()=>{
        fetchCurrentCourseProgress();

    },[id])


    console.log(lockCourse, 'lockCourse');
    

    return <div className="flex flex-col h-screen bg-[#1c1d1f] text-white">
        <div className="flex items-center justify-between p-4 bg-[#1c1d1f] border-b border-gray-700">
            <div className="flex items-center space-x-4">
                <Button onClick={()=>navigate('/student-courses')} className="text-black" variant="ghost" size="sm">
                    <ChevronLeft className="h-4 w-4 mr-2"/>
                    Back to My Courses Page
                </Button>
            </div>
            <Dialog open={lockCourse}>
                <DialogContent className="sm:w-[425px]">
                    <DialogHeader>
                        <DialogTitle>You can't view this page</DialogTitle>
                        <DialogDescription>
                            Please purchase this course to get access
                        </DialogDescription>
                    </DialogHeader>

                </DialogContent>
            </Dialog>
            <Dialog open={showCourseCompleteDialog}>
                <DialogContent className="sm:w-[425px]">
                    <DialogHeader>
                        <DialogTitle>
                            Congratulations!
                        </DialogTitle>
                        <DialogDescription className="flex flex-col gap-3">
                            <Label>You have completed the course</Label>
                            <div className="flex flex-row gap-3">
                                <Button>My Courses Page</Button>
                                <Button>Rewatch Course</Button>
                            </div>

                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>

            </Dialog>

        </div>
    </div>

}

export default StudentViewCourseProgressPage;