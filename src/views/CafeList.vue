<template>
    <div class="container my-4" id="app">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <h1 class="fw-bold text-center my-4">자유게시판</h1> 
	<!-- 새 글 작성 링크 -->
	<div class="mb-2" style="float:right;">
		<a class="link-success text-decoration-none" href="insertform.do">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
				<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
				<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
			</svg>
			새 글 작성
		</a>
	</div>
    <!-- 자유게시판 글 목록 -->
    <table class="table table-hover text-center">
        <thead>
            <tr>
                <th>번호</th>
                <th>            
                카테고리
                </th>
                <th>제목</th>
                <th>작성자</th>
                <th>날짜</th>
                <th>조회수</th>
                <th>
                    <svg style="color:#dc3545;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                    </svg>
                </th>  
             </tr>
        </thead>
		<tbody>
        <!-- 공지 글 출력 -->
            <tr v-bind="firstNotice" class="table-success">
                <th></th>
                <th>공지</th>
				<th>
					<a class="link-dark text-decoration-none fw-bold" href="/notice/detail.do"> <!--num 값 전달해서 router 이동-->
                    {{firstNotice.title}}
                    </a>
                </th>
				<th>{{firstNotice.writer}}</th>
				<th>{{firstNotice.regdate}}</th>
				<th>{{firstNotice.viewCount}}</th>
				<th></th>  
			</tr>
      </tbody>
		<tbody>
		<tr v-for="cafe in cafeList" :key="cafe.num">
			<td>{{cafe.num}}</td>
			<td>{{cafe.category}}</td>
			<td>
				<a class="link-dark text-decoration-none fw-bold">
				<!-- <%-- href="detail.do?num"> --%><%--num 값 전달 --%> -->
					{{cafe.title}}
				</a>
				<!--  댓글 개수 출력 -->
				<span v-if="cafe.reply_count != 0" class="mx-2" style="color:#198754;">{{cafe.reply_count}}</span>						              	               
                <!-- 이미지가 첨부되어 있을 시 아이콘 출력 -->
                <svg v-if="cafe.content.includes('img')" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-image" viewBox="0 0 16 16">
                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                    <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
                </svg> 
            </td>
            <td v-if="cafe.profile != null">
                <img class="listProfile" :src="base_url+cafe.profile"/>
                {{cafe.writer}}
            </td>
            <td v-else>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="listProfile bi bi-person-circle" viewBox="0 0 16 16">
					<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
					<path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
				</svg>
				{{cafe.writer}}
			</td>        
            <td>{{cafe.regdate}}</td>
            <td>{{cafe.viewCount}}</td>
            <td>{{cafe.likeCount}}</td>			
		</tr>
      </tbody>
    </table>
    <div class="page-ui">
        <!-- 페이징 처리 -->
        <ul class="pagination justify-content-center">
			<li v-if="startPageNum != 1" class="page-item">
				<a v-on:click.prevent="movePage(startPageNum-1)" class="page-link" href="">&lt;</a>
			</li> 
			<li v-else class="page-item disabled">
				<a href="javascript:" class="page-link">&lt;</a>
			</li> 
			
			<li v-for="(i,index) in pageNums" :key="index" class="page-item" :class="{active:i==pageNum}">
				<a v-on:click.prevent="movePage(i)" class="page-link" href="">{{i}}</a>
			</li> 
			
			<li v-if="endPageNum < totalPageCount" class="page-item">
				<a v-on:click.prevent="movePage(endPageNum+1)" class="page-link" href="">&gt;</a>
			</li> 
			<li v-else class="page-item disabled">
				<a class="page-link" href="javascript:">&gt;</a>
			</li>
		</ul>
	
	</div>

    
</div>
</template>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
<script>
import { ajaxPromise } from "../assets/js/gura_util";
const base_url="http://localhost:8888/minton05";

export default {
    name:"cafeList",
    data(){
        return {
            firstNotice:{},
            searchInput: '',
            searchedNum:0,
            cafeList:[],
            base_url,
            detailItem:{},
            startPageNum:1,
            endPageNum:5,
            totalPageCount:0,
            pageNum:1, //최초 로딩
        }        
    },
    computed:{
        pageNums(i){
            const nums=[];
            for(i=this.startPageNum; i<=this.endPageNum; i++){
                nums.push(i);
            }
            return nums;
        }
    },
    methods:{
        movePage(pageNum){
            this.pageNum=pageNum;
            this.updateUI();
        },
        updateUI(){
            //cafe 글 목록 요청해서 받아오기
            let self=this;
            //ajax 요청으로 cafe 글 목록을 json으로 받아온다.
            ajaxPromise(base_url+"/ajax/cafe/list.do","get","pageNum="+this.pageNum)
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                //data는 cafe글 목록이 들어 있는 array
                console.log(data);
                //받아온 데이터를 data의 모델에 넣어준다
                self.cafeList=data;
            });
            //하단 페이징 처리 데이터 받아오기
            ajaxPromise(base_url+"/ajax/cafe/paging.do","get","pageNum="+this.pageNum)
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                //data는 startPageNum, endPageNum, totalPageCount가 들어 있는 {}
                //console.log(data);
                //받아온 데이터를 data의 모델에 넣어준다
                self.startPageNum=data.startPageNum;
                self.endPageNum=data.endPageNum;
                self.totalPageCount=data.totalPageCount;
                //pageNum을 업데이트 => couputed
            });
            
            //공지사항 첫번째 글 데이터 가져오기
            ajaxPromise(base_url+"/ajax/cafe/firstNotice.do","get")
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                //data는 notice의 가장 최신 글
                //console.log(data);
                //firstNotice 모델에 넣어주기
                self.firstNotice=data;
            })
        }
    },
    created(){
        console.log("created");
        this.updateUI();
    }
}
</script>

<style scoped>
   .page-ui a{
      text-decoration: none;
      color: rgb(2,38,94);
   }
   
   .page-ui a:hover{
      text-decoration: underline;
   }
   
   .page-ui a.active{
      color: rgb(2,38,94);
      font-weight: bold;
      text-decoration: underline;
   }
   .page-ui ul{
      list-style-type: none;
      padding: 0;
   }
   
   .listProfile{
        width:15px;
        height:15px;
        border-radius:50%;
    }
        h1 {
		color: rgb(2,38,94); 
		text-shadow:1px 1px 1px rgb(1,148,148); 
		margin: 0; 
		padding: 10px; 
		font-weight: bold; 
	}
	th{
		color: #198754; 
	}

	a{
		color:rgb(2,38,94);
		text-decoration: none;
	}
	html {
        height: 100%;
	}

	#ccontainer{
		margin:0 auto; 
		padding:5px; 
		background-color:rgb(255,255,255, 0.9); 
		border-radius: 30px
	}
</style>