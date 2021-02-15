import { IconsModule } from './icons/icons.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { MdToHtmlPipe } from './shared/pipes/md-to-html.pipe';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    LayoutComponent,
    ExperienceComponent,
    MdToHtmlPipe,
    ProjectsComponent,
    ContactComponent,
    FooterComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
