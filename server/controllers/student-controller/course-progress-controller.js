
const CourseProgress = require('../../models/CourseProgress');
const Course = require('../../models/Course');
const StudentCourses = require('../../models/StudentCourses');


//mark current lecture as viewed
const markCurrentLectureAsViewed = async(req, res)=>{
    try{

    }catch(error){
        console.log(error);
        res.status(500).json({
            success : false,
            message: 'Some error occurred'
        })

    }
}



//get our current course progress
const getCurrentCourseProgress = async(req, res)=>{
    console.log("Aarushi")
    try{
        const {userId, courseId} = req.params;

        const studentPurchasedCourses = await StudentCourses.findOne({userId})

        const isCurrentCourseIsPurchasedByCurrentUserOrNot = 
        studentPurchasedCourses?.courses?.findIndex(item=> item.courseId === courseId) > -1

        if(!isCurrentCourseIsPurchasedByCurrentUserOrNot){
            return res.status(200).json({
                success : true,
                data : {
                    isPurchased : false,

                },
                message : 'You need to purchase this course to access it'
            })
        }

        const currentUserCourseProgress = await CourseProgress.findOne({userId, courseId});

        if(!currentUserCourseProgress || currentUserCourseProgress?.lecturesProgress?.length === 0){
            const course = await Course.findById(courseId);
            if(!course){
                return res.status(404).json({
                    success : false,
                    message: 'Course not found'
                })
            }

            return res.status(200).json({
                success : true,
                message : 'No progress found, you can start watching the course',
                data : {
                    courseDetails : course,
                    progress : [],
                    isPurchased : true
                }

            })
        }

        const courseDetails = await Course.findById(courseId);

        res.status(200).json({
            success : true,
            data : {
                courseDetails,
                progress : currentUserCourseProgress.lecturesProgress,
                completed : currentUserCourseProgress.completed,
                completionDate : currentUserCourseProgress.completionDate,
                isPurchased: true
            }
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            success : false,
            message: 'Some error occurred'
        })

    }
}



//reset course progress

const resetCurrentCourseProgress = async(req, res)=>{
    try{

    }catch(error){
        console.log(error);
        res.status(500).json({
            success : false,
            message: 'Some error occurred'
        })

    }
}


module.exports = {
    markCurrentLectureAsViewed,
    getCurrentCourseProgress,
    resetCurrentCourseProgress
}