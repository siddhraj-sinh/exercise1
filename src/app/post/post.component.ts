import { Component, OnInit } from '@angular/core';
import { PostDataService } from '../services/post-data.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  
  posts:any[]=[];
  newPost = {
    title: '',
    body: ''
  };

  selectedPostId: number | null = null;


  constructor(private postData:PostDataService ){
     
  }
  ngOnInit(): void {
     this.loadAllPosts();

  }
  selectPost(id: any) {
    this.selectedPostId = id;
    this.getPost(id);
  }

  submitPostForm() {
    if (this.selectedPostId) {
      this.updatePost();
    } else {
      this.createPost();
    }
  }
  
  loadAllPosts(){
    this.postData.getAllPost().subscribe((data)=>{this.posts=data;});
  }

  createPost(){
    console.log(this.newPost);
    
    this.postData.createPost(this.newPost).subscribe((res)=>{console.log(res);this.newPost={title:"",body:""};this.loadAllPosts();});
  }

  getPost(id:any){
   this.postData.getPost(id).subscribe((res)=>{this.newPost=res; });
  }
  updatePost(){
    // this.getPost(this.selectedPostId);
     this.postData.updatePost(this.selectedPostId,this.newPost).subscribe(res=>{console.log(res);this.loadAllPosts();});
  }
  deletePost(id:any) {
   
      this.postData.deletePost(id).subscribe(response => {
        console.log('Post deleted successfully');
        // Handle the response or perform any additional operations
        // Refresh the list of posts after deleting
        this.loadAllPosts();
      });
    
  }
}
