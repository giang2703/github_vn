# Terms (danhtu)

Repository (Repo) - thư mục dự án 
Branch (nhánh)
Conflict (xung đột)
Local - all những gì trên máy tính gồm hình ảnh,...
Remote - all những gì k nằm trên máy tính mà nằm trên 1 server nào đó

# Comands ( lệnh)

- git init 
- git status  (thấy đc trạng thái dự án)
- git add (chuẩn bị lưu lại thời điểm htai của dự án + tên or git add .)
- git reset (trở lại k chuẩn bị lưu nữa)
- git commit -m "ghi chú"
- git log (coi lại thời điểm lưu)
- git log --oneline 
- git checkout {branch name}
- git branch (ktra brach)
- git checkout -b{branch name}(tạo 1 branch mới)
- git merge {branch name} (tổng hợp lại branch)
- git branch -d {branch name} (xoá branch)
- git push (đẩy len local, remote repo)
- git clone + đường dẫn HTTPS (lấy code về)
- git push -u origin + tên branch(tạo branch ở dưới và đâỷ lên git -chỉ cần -u 1 lần, những lần sau push bth)
~ Lấy 1 branch có sẵn trên git
- git fetch origin
- git checkout -b staging origin/staging
# gitignore này xác định những file/thư mục nào mà k muốn git quan tâm tới như
.env 
- cho vào nhánh master
- git add .
- git commit -m 'gitignore'
- git push