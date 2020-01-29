package arangoManager;

import java.util.ArrayList;

@SuppressWarnings("unused")
public class Config{
	// Number of iterations
	// Interval time between each one
	// Initial time
	private int iterations;
	long initialDate;  // time from 1970
	long dateInterval; // segundos 
	ArrayList<String> dates;



	public Config(ArrayList<String> dates) {
		super();
		this.dates = dates;
	}


	public ArrayList<String> getDates() {
		return dates;
	}


	public void setDates(ArrayList<String> dates) {
		this.dates = dates;
	}


	public int getIterations() {
		return iterations;
	}
	public void setIterations(int iterations) {
		this.iterations = iterations;
	}
	public long getInitialDate() {
		return initialDate;
	}
	public void setInitialDate(long initialDate) {
		this.initialDate = initialDate;
	}
	public long getDateInterval() {
		return dateInterval;
	}
	public void setDateInterval(int dateInterval) {
		this.dateInterval = dateInterval;
	}
	public Config(int iterations, long initialDate, long dateInterval) {
		super();
		this.iterations = iterations;
		this.initialDate = initialDate;
		this.dateInterval = dateInterval;
	}



}
