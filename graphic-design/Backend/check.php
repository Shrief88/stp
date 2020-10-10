<?php
  include ('connection.php');
  if(isset($_POST['submit'])){      
        $fullname=$_POST['fname'];
        $email=$_POST['email'];
        $phone=$_POST['tel'];
       
      
        if(empty($fullname)|| empty($email)||empty($phone))
           echo "<script> alert('You Do not set all the inputs');  window.location.href='../graphics.php';</script>";
        else{
           $result = $conn->query("SELECT tel FROM user WHERE tel='$phone'");
           $record = $conn->query("SELECT email FROM user WHERE email='$email'");
           if($result->num_rows != 0)
                echo "<script> alert('Oops!, This phone is already Exist!');  window.location.href='../graphics.php';</script>";
           elseif($record->num_rows != 0)   
                echo "<script> alert('Oops!, This Email is already Exist!');  window.location.href='../graphics.php';</script>";
           else{
             $sql_insert="INSERT into user(name,email,tel)
                 Values('$fullname','$email','$phone');";
                 if (mysqli_query($conn,$sql_insert)) 
                    echo "<script> alert('Thank you $fullname');  window.location.href = 'http://www.stp-egypt.com';</script>";
                 else
                    echo "<script> alert('Oops!, please check your info again');  window.location.href='../graphics.php';</script>";
           } 
        }      
    }