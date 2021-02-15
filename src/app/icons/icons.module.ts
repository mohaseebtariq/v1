import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { Folder, Github, Linkedin, Instagram, Twitter, Send, ExternalLink } from 'angular-feather/icons';

const icons = {
  Github,
  Folder,
  ExternalLink,
  Linkedin,
  Instagram,
  Twitter,
  Send,
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FeatherModule.pick(icons)
  ],
  exports: [
    FeatherModule
  ]
})
export class IconsModule { }
