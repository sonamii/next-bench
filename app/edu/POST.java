// Sample POST request handler for storing details in database.
package edu;

public class POST {
    private String name;
    private int age;
    private String email;

    public GET(String name, int age, String email) {
        this.name = name;
        this.age = age;
        this.email = email;
    }

    // Getter and Setter methods
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "GET{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", email='" + email + '\'' +
                '}';
    }

    public static void main(String[] args) {
        GET person = new GET("Name", 30, "Email");
        System.out.println(person);
    }
}