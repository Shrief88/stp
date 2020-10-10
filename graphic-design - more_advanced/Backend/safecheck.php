<?php
 
  if(isset($_POST['submit'])){ 
   include ('connection.php');     
        $fullname=$_POST['fname'];
        $email=$_POST['email'];
        $phone=$_POST['tel'];
        $university = $_POST['uni'];
       
      
        if(empty($fullname)|| empty($email)||empty($phone) || empty($university))
           echo "<script> alert('You Do not set all the inputs');  window.location.href='../graphics.php';</script>";
        else{
           //create a prepared statment 
           $stmt_tel = $conn->prepare("SELECT phone FROM student WHERE phone= ? ");
           $stmt_email = $conn->prepare("SELECT email FROM student WHERE email= ? ");
           // check if the prepared statment work or not 
           if(! ($stmt_email && $stmt_tel))
               echo "<script> alert('SQL failed');  window.location.href='../graphics.php';</script>";
           else
               $stmt_email->bind_param("s" , $email);
               $stmt_email->execute();
               $result_email = mysqli_stmt_get_result($stmt_email);

               $stmt_tel->bind_param("s" , $phone);
               $stmt_tel->execute();
               $result_tel = mysqli_stmt_get_result($stmt_tel);

               
               


           if($result_tel ->num_rows != 0)
                echo "<script> alert('Oops!, This phone is already Exist!');  window.location.href='../graphics.php'; </script>";
           elseif($result_email ->num_rows != 0)   
                 echo "<script> alert('Oops!, This email is already Exist!'); window.location.href='../graphics.php'; </script>";
           else{

            $stmt_uni = $conn->prepare("SELECT name FROM university WHERE name= ? ");
            $stmt_uni->bind_param("s" , $university);
            $stmt_uni->execute();
            $result_uni = mysqli_stmt_get_result($stmt_uni);

            if($result_uni->num_rows == 0){
               $stmt_insert= $conn->prepare("INSERT into university(name) Values(?);");
               $stmt_insert->bind_param("s" , $university);
               $stmt_insert->execute();
            }
             
            $stmt_uni = $conn->prepare("SELECT id FROM university WHERE name= ? ");
            $stmt_uni->bind_param("s" , $university);
            $stmt_uni->execute();
            $result_uni = mysqli_stmt_get_result($stmt_uni); 
            $result_uni = $result_uni->fetch_object();
            $university = $result_uni->id;
            echo $university;




             $stmt_insert= $conn->prepare("INSERT into student(name,email,phone,university_id) Values(?,?,?,?);");
             $stmt_insert->bind_param("sssi" , $fullname , $email , $phone , $university);
             if (!$stmt_insert->execute())
                echo "<script> alert('Oops!, please check your info again'); window.location.href='../graphics.php';";
             else 
                echo "<script> alert('Thank you $fullname');  window.location.href = 'http://www.stp-egypt.com';</script>";   
           } 
        }
        $conn->close();  
    }

 