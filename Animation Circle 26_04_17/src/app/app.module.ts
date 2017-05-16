import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import { MainHomePage } from '../pages/main-home/main-home';
import { PostAJobPage } from '../pages/post-a-job/post-a-job';
import { MyProfilePage } from '../pages/my-profile/my-profile';
import { EditBasicDetailPage } from '../pages/edit-basic-detail/edit-basic-detail';
import { ContactDetailsPage } from '../pages/contact-details/contact-details';
import { ResumeHeadlinePage } from '../pages/resume-headline/resume-headline';
import { ProfileSummaryPage } from '../pages/profile-summary/profile-summary';
import { KeySkillPage } from '../pages/key-skill/key-skill';
import { WorkExperiancePage } from '../pages/work-experiance/work-experiance';
import { ProjectPage } from '../pages/project/project';
import { ITSkillPage } from '../pages//it-skill/it-skill';
import { AddEducationPage } from '../pages/add-education/add-education';
import { CertificationsPage } from '../pages/certifications/certifications';
import { WorkDetailsPage } from '../pages/work-details/work-details';
import { OtherDetailsPage } from '../pages/other-details/other-details';
import { WorkExperiance1Page } from '../pages/work-experiance1/work-experiance1';
import { ResumePage } from '../pages/resume/resume';
import { JobDetailsPage } from '../pages/job-details/job-details';
import { JobDetails1Page } from '../pages/job-details1/job-details1';
import { ChatscreenPage } from '../pages/chatscreen/chatscreen';
import { MychatPage } from '../pages/mychat/mychat';
import { Storage } from '@ionic/storage';
import {SeekerHomePage} from '../pages/seeker-home/seeker-home';
import {NewJobPage} from '../pages/new-job/new-job';
import {SpecificChatPage} from '../pages/specific-chat/specific-chat';
import {SearchProfilePage} from '../pages/search-profile/search-profile';
import {ShowProfilePage} from '../pages/show-profile/show-profile';
import {EmployeeProfilePagePage} from '../pages/employee-profile-page/employee-profile-page';
import {EditmyProfilePage} from '../pages/editmy-profile/editmy-profile';
import {AddlanguagePage} from '../pages/addlanguage/addlanguage';
import {EditpersonaldetailsPage} from '../pages/editpersonaldetails/editpersonaldetails';
import {ResumeuploadPage} from '../pages/resumeupload/resumeupload';
import {WallPostPage} from '../pages/wall-post/wall-post';
import {MyActionsPage} from '../pages/my-actions/my-actions';
import {CompanylistPage} from '../pages/companylist/companylist';
import {LoginselectionPage} from '../pages/loginselection/loginselection';
import {AppliedjobsPage} from '../pages/appliedjobs/appliedjobs';
import {ForgotpasswordPage} from '../pages/forgotpassword/forgotpassword';
import {FeedbackPage} from '../pages/feedback/feedback';
import {PolicyPage} from '../pages/policy/policy';
import {PopoverPage} from '../pages/popover/popover';

@NgModule({
  declarations: [
  MyApp,
    HomePage,SignupPage,MainHomePage,PostAJobPage,MyProfilePage,EditBasicDetailPage,ContactDetailsPage,ResumeHeadlinePage,
    ProfileSummaryPage,KeySkillPage,WorkExperiancePage,ProjectPage,ITSkillPage,AddEducationPage,CertificationsPage,
    WorkDetailsPage,OtherDetailsPage,WorkExperiance1Page,ResumePage,JobDetailsPage,JobDetails1Page,ChatscreenPage,MychatPage,
    SeekerHomePage,NewJobPage,SpecificChatPage,SearchProfilePage,ShowProfilePage,EmployeeProfilePagePage,EditmyProfilePage,
    AddlanguagePage,EditpersonaldetailsPage,ResumeuploadPage,WallPostPage,MyActionsPage,CompanylistPage,LoginselectionPage,
    AppliedjobsPage,ForgotpasswordPage,FeedbackPage,PolicyPage,PopoverPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
     MyApp,
    HomePage,SignupPage,MainHomePage,PostAJobPage,MyProfilePage,EditBasicDetailPage,ContactDetailsPage,ResumeHeadlinePage,
    ProfileSummaryPage,KeySkillPage,WorkExperiancePage,ProjectPage,ITSkillPage,AddEducationPage,CertificationsPage,WorkDetailsPage,
    OtherDetailsPage,WorkExperiance1Page,ResumePage,JobDetailsPage,JobDetails1Page,ChatscreenPage,MychatPage,SeekerHomePage,NewJobPage,
    SpecificChatPage,SearchProfilePage,ShowProfilePage,EmployeeProfilePagePage,EditmyProfilePage,AddlanguagePage,EditpersonaldetailsPage,
    ResumeuploadPage,WallPostPage,MyActionsPage,CompanylistPage,LoginselectionPage,AppliedjobsPage,ForgotpasswordPage,FeedbackPage,PolicyPage
    ,PopoverPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},Storage]
})
export class AppModule {}
