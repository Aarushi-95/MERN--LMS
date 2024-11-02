import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FormControls from "@/components/ui/common-form/form-controls";
import { courseLandingPageFormControls } from "@/config";
import { InstructorContext } from "@/context/instructor-context";
import { useContext } from "react";


function CourseLanding(){
    const {courseLandingFormData, setCourseLandingFormData} = useContext(InstructorContext);
    return (
    <Card>
        <CardHeader>
            <CardTitle>Course Landing Page</CardTitle>
        </CardHeader>
        <CardContent>
            <FormControls
            formControls={courseLandingPageFormControls}
            formData={courseLandingFormData}
            setFormData={setCourseLandingFormData}
            />
        </CardContent>
    </Card>
    );
}

export default CourseLanding;